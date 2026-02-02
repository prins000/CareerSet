import { JOB_API_ENDPOINT } from '../utils/endpoints'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '../redux/slices/jobSlice'
import { useEffect } from 'react'

const useGetJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get`);

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Error fetching jobs:", error.message);
      }
    };

    fetchJobs();
  }, [dispatch]);
};

export default useGetJob;
