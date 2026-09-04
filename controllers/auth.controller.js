import User from "../models/User.js";
import slugify from "slugify";
import asyncHanlder from "express-async-handler";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createToken } from "../utils/createToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";



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


// @desc make sure user is logged befor accessing protected routes
// @usage apply protection handler before validation in private routes
export const protection = asyncHanlder(async (req , res , next) =>{
    //fetch token from request
    let token;
    if(req.headers.authorization && req.headers.authorization.startWith("Bearer"))
    {
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token) return next(new ApiError("Please login to access this route" , 401));

    //check token is valid 
    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    //check user existence 
    const Id = decoded.userId;
    const user =await User.findOne({userId : Id});
    if(!user) return next(new ApiError("user is no longer exist" , 401));

    //check Password change timeStamps 
    if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );

    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          'User recently changed his password. please login again..',
          401
        )
      );
    }
    }

    req.user = currentUser;
    next();
});

// @desc checks user role against allowed roles
// @Note roles can be accessed thanks to closure property
export const allowedTo = (...roles) => asyncHanlder (async (req , res , next)=>{
    if(!roles.includes("req.user.role")){
        return next(new ApiError("you do not have the permession to access this route" , 403));
    }
    next();
});


// @desc forget user password
// @route POST /api/V1/auth/forgotpassword
// @access Puplic
export const forgotPassword = asyncHanlder(async (req , res , next)=> {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(
        new ApiError(`There is no user with that email ${req.body.email}`, 404)
        );
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto
        .createHash('sha256')
        .update(resetCode)
        .digest('hex');

    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerified = false;

    await user.save();

    try {
        await sendEmail({
        to: user.email,
        subject: "Your eCommerce cerification code",
        text: `Here is your verification code ${resetCode}`,
    });

    } catch(err){
        user.passwordResetCode = null;
        user.passwordResetExpires = null;
        user.passwordResetVerified = null;
        await user.save();
        return next(new ApiError("Email sending failed" , 500));
    };

    res.status(200).json({message : "code is successfully sent to email"});
});

// @desc verify code
// @route POST /api/V1/auth/verifycode
// @access Puplic
export const verifyResetCode = asyncHanlder (async (req , res , next) =>{
    const resetCode = req.body.resetCode;
    const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

    const user = await User.findOne({passwordResetCode : hashedResetCode , passwordResetExpires : { $gt : Date.now()}});
    if(!user) return next(new ApiError ("verifacation code is incorrect or expiered"));
    user.passwordResetVerified = true;
    await user.save();
    res.status(200).json({message : "code verifacation done successfully"});
});


// @desc reset password
// @route PUT /api/V1/auth/resetpassword
// @access Puplic
export const resetPassword = asyncHanlder( async (req, res , next) => {

    const {email , password} = req.body;

    const user = await User.findByIdAndUpdate(
        {email : email},
        { new: true, runValidators: true }
    );
    if (!user) return next(new ApiError("User not Found" , 404));

    if(!user.passwordResetVerified) return next(new ApiError("Reset code not verified", 400));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.passwordResetCode = null;
    user.passwordResetExpires = Date.now();
    user.passwordResetVerified = null;

    await user.save();
    createToken(user._id);

    res.status(200).json({ status: "success", token });
});




