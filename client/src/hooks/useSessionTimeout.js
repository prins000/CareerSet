import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import { toast } from 'sonner';

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const WARNING_DURATION = 5 * 60 * 1000; // 5 minutes before timeout

export const useSessionTimeout = () => {
  const { user, loginTimestamp } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !loginTimestamp) return;

    const checkSession = () => {
      const currentTime = Date.now();
      const sessionAge = currentTime - loginTimestamp;
      const timeRemaining = SESSION_DURATION - sessionAge;

      if (timeRemaining <= 0) {
        // Session expired, logout user
        dispatch(setUser(null));
        toast.error('Your session has expired. Please login again.');
        return;
      }

      if (timeRemaining <= WARNING_DURATION) {
        // Show warning that session will expire soon
        const minutesRemaining = Math.ceil(timeRemaining / (60 * 1000));
        toast.warning(`Your session will expire in ${minutesRemaining} minutes. Please save your work.`);
      }
    };

    // Check immediately
    checkSession();

    // Set up interval to check every minute
    const interval = setInterval(checkSession, 60 * 1000);

    // Set up timeout for automatic logout
    const timeout = setTimeout(() => {
      dispatch(setUser(null));
      toast.error('Your session has expired. Please login again.');
    }, SESSION_DURATION - (Date.now() - loginTimestamp));

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [user, loginTimestamp, dispatch]);

  return null;
};
