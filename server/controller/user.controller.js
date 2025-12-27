import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

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

    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      mobile,
      password: hashedPass,
      role,
    });

    return res.status(201).json({
      messege: "User registered successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
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
      return res.send(404).json({
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

    // req ni body mathi kadhel skills array e string formate ma ave pachi bhale db ma array apyo  hoy db ma array apyo che pan skills string ma avse mate pahri tene array ma convert karva karna ke store to karavu padse ne
  
    let skillsArray= skills.split(",");
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
    user.profile.skills=skillsArray;

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
