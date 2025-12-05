import {Company} from "../models/company.model.js";

export const createCompany = async(req,res)=>{
    try{

        const {company} = req.body;
        
        if(!company){
            return res.status(400).json({message:"Company data is required",success:false});
        }
            let existingCompany= await Company.findOne({name:company});
        if(existingCompany){
           return res.status(409).json({message:"Company already exists",success:false});
        }

       existingCompany =  await Company.create({
            name:company,
            userId:req.id,
        })

        return res.status(201).json({message:"Company created successfully",success:true,data:existingCompany});
    }
    catch(err){
        console.log(err);
    }
}


// loged user's companies
export const getCompany=async(req,res)=>{
    try{

        const userId=req.id;

        const companies= await Company.find({userId});
        
        if(!companies || companies.length===0){
            return res.status(404).json({message:"No companies found for this user",success:false});
        }

        return res.status(200).json({message:"Companies fetched successfully",success:true,data:companies});
    
    }catch(err){
       console.log(err);
       
    }
} 


// get specific company means company by company id
export const getCompanyById=async(req,res)=>{
    try{

        const companyId=req.params.id;

        const company= await Company.findById(companyId);               
        if(!company){
            return res.status(404).json({message:"Company not found",success:false});
        }

        return res.status(200).json({message:"Company fetched successfully",success:true,data:company});
    
    }catch(err){
       console.log(err);
       
    }
}

export const updateCompany= async (req,res)=>{

    try{
        const companyId= req.params.id;
        const {name,description,location,website}=req.body;
         const file=req.file;
 
         //cloudnarry ayega
  
         const updatedData={name,description,location,website};

         let company= await Company.findByIdAndUpdate(companyId,updatedData,{new:true});
         if(!company){
            return res.status(404).json({message:"Company not found",success:false});

         }

         return res.status(200).json({message:"Company updated successfully",success:true,data:company});

    }catch(err){
              console.log(err);
    }
}