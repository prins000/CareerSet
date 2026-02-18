import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, mobile, password, role } = req.body;

    if (!fullname || !email || !mobile || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        Success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists please login",
        success: false,
      });
    }

    const mobileExists = await User.findOne({ mobile });
if (mobileExists) {
  return res.status(400).json({
    message: "Mobile number already registered",
    success: false,
  });
}

    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      mobile,
      password: hashedPass,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (err) {
      if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      message: `${field} already exists`,
      success: false,
    });
  }

  return res.status(500).json({
    message: "Server error",
    success: false,
  });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Fill required fields",
        success: false,
      });
    }

    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found, please register",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    const tokenData = {
      userId: existingUser._id,
    };

    //create jwt token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    existingUser = {
      _id: existingUser._id,
      fullname: existingUser.fullname,
      email: existingUser.email,
      mobile: existingUser.mobile,
      role: existingUser.role,
      profile: existingUser.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: "Login successful",
        existingUser,
        success: true,
      });
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      messege: "Logout successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { fullname, email, mobile, bio, skills } = req.body;

    if (!fullname || !email || !mobile || !bio || !skills) {
      return res.status(400).json({
        message: "Something is missing",
        Success: false,
      });
    }

    let user = await User.findById(userId);

    if(!user){
        return res.status(404).json({
            message:"User not found",
            success:false,
        });
    }   

    user.fullname=fullname;
    user.email=email;
    user.mobile=mobile;
    user.profile.bio=bio;
    user.profile.skills=skills;

    // Handle resume upload
    if (req.files && req.files.resume) {
      const resumeFile = req.files.resume[0];
      const resumeResult = await uploadToCloudinary(resumeFile, 'resumes');
      user.profile.resume = resumeResult.url;
      user.profile.resumename = resumeFile.originalname;
    }

    // Handle profile photo upload
    if (req.files && req.files.profilePhoto) {
      const photoFile = req.files.profilePhoto[0];
      const photoResult = await uploadToCloudinary(photoFile, 'profile-photos');
      user.profile.profilePhoto = photoResult.url;
    }

    await user.save();

    return res.status(200).json({
        message:"Profile updated successfully",
        user,
        success:true,
    });
     
} catch (err) {
    console.log(err);
  }
};
