import mongoose from 'mongoose';

const companySchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
    },
    location:{
        type:String, 
    },
    website:{
        type:String,
    },
    logo:{
        type:String,    
        default:'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
    },
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       required:true,
    }


},{timestamps:true});

export const Company=mongoose.model('Company',companySchema);