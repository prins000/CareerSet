import { JOB_API_ENDPOINT } from '../utils/endpoints'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '../redux/slices/jobSlice'
import { useEffect } from 'react'


const useGetJob = () => {
    const disPatch=useDispatch();
   
    useEffect(()=>{
        const fetchJobs=async()=>{
            try {
                const res= await axios.get(`${JOB_API_ENDPOINT}/get`,{
                    withCredentials:true
                });

                if(res.data.success){
                    console.log(res.data.jobs);
                     disPatch(setAllJobs(res.data.jobs));
                }
                
            } catch (error) {
                console.log("Error fetching jobs:",error);
            }
        }

        fetchJobs();
    },[disPatch])
}

export default useGetJob
