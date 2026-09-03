import User from "../models/User.js"
import slugify from "slugify";
import asyncHanlder from "express-async-handler";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/createToken.js";



// @desc    Signup
// @route   POST /api/V1/auth/signup
// @access  Public
export const signUp = asyncHanlder(async (req , res , next) =>{
    const {name , profileImage , password , email , phone 
        } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);    
    const user = new User({
            name : name,
            slug : slugify(name),
            profileImage : profileImage,
            password : hashedPassword,
            email : email,
            phone : phone,
    });

    const token = createToken(user._id);


    const savedUser = await user.save();
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json({data : userResponse , token});
});


// @desc    Signin
// @route   POST /api/V1/auth/signin
// @access  Public
export const signIn = asyncHanlder(async (req , res ,next) =>{
    const {email , password} = req.body;

    const user = await User.findOne({email : email});
    if(!user) return next(new ApiError("Incorrect email or password" , 404));

    const isMatching = await bcrypt.compare(password , user.password);
    if(!isMatching) return next(new ApiError("Incorrect email or password" , 401));

    const token = createToken(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({data : userResponse , token});
});