import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({

    fullname:{
       type:String,
       required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['Student','Recruiter'],
        required:true,
    },

    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumename:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{
            type:String,
            default:'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png',
        }   
     }

},{timestamps:true});

export const  User=mongoose.model('User',userSchema);