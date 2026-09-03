import User from "../models/User.js"
import slugify from "slugify";
import asyncHanlder from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import bcrypt from "bcryptjs";

// @desc adding user
// @route api/V1/users
// @access Private
export const createUser = asyncHanlder(async (req , res) => {
    
    const {name , profileImage , password , email , phone , role
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
            role : role, 
    });

    const savedUser = await user.save();
    const userResponse = savedUser.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
});

// @desc get users
// @route api/V1/users
// @access Private
export const getAllUsers = asyncHanlder( async (req , res) => {
    
    const features = new ApiFeatures(User.find() , req.query)
    .filter()
    .search("User")
    .pagination()
    .fieldLimiting();

    const users = await features.baseQuery;
    res.status(200).json(users);
});

// @desc get user
// @route api/V1/users/:id
// @access Private
export const getUserById = asyncHanlder(async(req , res , next) => {
    const user = await User.findById(req.params.id).select('-password');
    if(!user) return next(new ApiError("User not Found" , 404));
    res.status(200).json(user);
});

// @desc modify user
// @route api/V1/users/:id
// @access Private
export const updateUser = asyncHanlder( async (req, res , next) => {

    const {name , email, profileImage , phone , role } = req.body;
    const updateData = {}
    if (name) {
        updateData.name = name;
        updateData.slug = slugify(name);
    }
    if (email !== undefined) updateData.email = email;
    if (profileImage !== undefined) updateData.profileImage = profileImage;
    if (phone !== undefined) updateData.phone = phone;
    if (role !== undefined) updateData.role = role;

    const updatedUser = await User.findByIdAndUpdate(
         req.params.id,
         updateData,
        { new: true, runValidators: true }
    );
        
    if (!updatedUser) return next(new ApiError("User not Found" , 404));
    res.status(200).json(updatedUser);
});


// @desc modify user password
// @route api/V1/users/changePassword/:id
// @access Private
export const updateUserPassword = asyncHanlder( async (req, res , next) => {

    const {password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);  

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {password : hashedPassword},
        { new: true, runValidators: true }
    ).select('-password');
    if (!updatedUser) return next(new ApiError("User not Found" , 404));

    res.status(200).json(updatedUser);
});

// @desc deleteing user
// @route api/V1/users/:id
// @access Private
export const deleteUser = asyncHanlder( async (req, res , next) => {
    
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return next(new ApiError("User not Found" , 404));
    res.status(200).json({ message: 'User deleted successfully' });
});