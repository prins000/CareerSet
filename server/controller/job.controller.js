import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      company,
    } = req.body;

    if(!title || !description || !requirements || !salary || !location || !jobType || !position || !company){
        return res.status(400).json({
            message:"All fields are required",
            success:false,
        })
    }

     let job= await Job.create({
      title,
      description,
      requirements: Array.isArray(requirements) ? requirements : requirements.split(","),
      salary,
      location,
      jobType,
      position,
      company,
      createdBy:req.id,
    })

    return res.status(200).json({
        message:"Job posted successfully",
        success:true,
        job
    })
  
  
  
    } catch (err) {
    console.log(err);
  }
};


// filter for user
export const filter = async (req, res) => {
  try {
    const keyword = req.query.keyword || ""; 

    let query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };

    const jobs = await Job.find(query).populate({
      path:'company',
    });

    return res.status(200).json({
      success: true,
      message: jobs.length ? "Jobs fetched successfully" : "No jobs found",
      jobs
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



export const jobById=async (req,res)=>{
    try {
        const jobId=req.params.id;
        const job= await Job.findById(jobId).populate("applications").populate("company");
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false,
            })

        }

        return res.status(200).json({
            message:"Job fetched successfully",
            success:true,
            job
        })


    } catch (err) {
        console.log(err);
    }
}



export const getJob= async (req,res)=>{
    try{
       const jobs = await Job.find({ createdBy: req.id }).populate("company");


        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false,
            })      
        }
        
        return res.status(200).json({
            message:"Jobs fetched successfully",
            success:true,
            jobs
        })
    }
    catch(err){
        console.log(err);
    }

}

export const updateJob= async (req,res)=>{
    try {
        const jobId=req.params.id;
        const {title, description, requirements, salary, location, jobType, position, company} = req.body;
        if(!title || !description || !requirements || !salary || !location || !jobType || !position || !company){
            return res.status(400).json({
                message:"All fields are required",
                success:false,
            })
        }
        const updatedJob = await Job.findByIdAndUpdate(jobId, {
            title,
            description,
            requirements: Array.isArray(requirements) ? requirements : requirements.split(","),
            salary,
            location,
            jobType,
            position,
            company
        }, { new: true });

        if (!updatedJob) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully",
            success: true,
            updatedJob
        });
    }
    catch (err) {
        console.log(err);
    }   
  }
