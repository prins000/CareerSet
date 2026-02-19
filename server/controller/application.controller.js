import {Application } from '../models/application.model.js';
import { Job } from '../models/job.model.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import fs from 'fs';

export const applyjob= async(req,res)=>{
    try {
         const jobId= req.params.jobId;
         const userId= req.id;
         
         const existingApplication= await Application.findOne({job:jobId,applicant:userId});
         if(existingApplication){
            return res.status(404).json({
                message:"You have already applied for this job",
                success:false,
            })
         }

         let job= await Job.findById(jobId);
         if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false,
            })
         }

         // Check if resume file is uploaded
         if (!req.file) {
            return res.status(400).json({
                message:"Resume file is required",
                success:false,
            })
         }

        // Upload resume to Cloudinary from local temp storage as raw file
        const resumeUploadResult = await uploadToCloudinary(req.file.path, "job-portal-resumes", "raw");
         
         if (!resumeUploadResult) {
            return res.status(500).json({
                message:"Failed to upload resume",
                success:false,
            })
         }

         let newApplication= new Application({
            job:jobId,
            applicant:userId,
            resume: {
                public_id: resumeUploadResult.public_id,
                url: resumeUploadResult.url
            }
         })
         await newApplication.save();

         job.applications.push(newApplication._id);
         await job.save();

         return res.status(200).json({
            message:"job Applied Successfully",
            success:true,
            application: newApplication
         })

    } catch (error) {
       console.log(error);
       // Clean up temp file if it exists and there was an error
       if (req.file && req.file.path && fs.existsSync(req.file.path)) {
           fs.unlinkSync(req.file.path);
       }
       return res.status(500).json({
           message:"Internal server error",
           success:false,
       })
    }
}

export const getApplication= async (req,res)=>{
        try {
            const userId=req.id;
        const app= await Application.find({applicant:userId}).sort({createAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        })

        
        return res.status(200).json({
            message:"Applications fetched successfully",
            success:true,
            app:app||[],
        })  
        } catch (error) {
            console.log(error);
        }
    }


    export const getApplicant= async (req,res)=>{
        try {
            const jobId=req.params.jobId;
        const app= await Application.find({job:jobId}).sort({createAt:-1}).populate({
            path:"applicant",
            options:{sort:{createdAt:-1}},
        })

        if(!app || app.length===0){
            return res.status(404).json({
                message:"No Applications found",
                success:false,
            })
        }
        return res.status(200).json({
            message:"Applications fetched successfully",
            success:true,
            app,
        })
        } catch (error) {
            console.log(error);
        }  
    }


    export const updateStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({                       
                message:"Status is required",
                success:false,
            })
        }

        const application = await Application.findById(applicationId);


        if (!application) {
            return res.status(404).json({
                message:"Application not found",
                success:false,
            })
        }

        application.status=status;
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully",
            success:true,
        });

    } catch (error) {
        console.log(error);
    }
}       