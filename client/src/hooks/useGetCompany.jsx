import { COMPANY_API_ENDPOINT } from "../utils/endpoints";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCompanies } from "../redux/slices/companySlice";
import { useEffect } from "react";

const useGetCompany = () => {
  const dispatch = useDispatch();
   const user=useSelector((state)=>state.auth.user);
  useEffect(() => {
    if (user?.role !== "Recruiter") return;
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log(res.data.jobs);
          dispatch(setCompanies(res.data?.companies || []));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompanies();
  }, [dispatch,user]);
};

export default useGetCompany;
