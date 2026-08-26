import Category from "../models/Category.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";

// @route POST /api/v1/categories
// @access Private
export const createCategory = asyncHandler (async (req,res) => {
   
        const {name , description, image} = req.body;
        const category = new Category ({
            name ,
            description,
            image,
            slug : slugify(name)
        });
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
});

// @route GET /api/v1/categories
// access Private
export const getCategoryById = asyncHandler (async (req , res) => {
    const category = await Category.findById(req.params.id);
    if(!category) return next(new ApiError("category not found for this id" , 404));
    res.status(200).json(category);
});
export const getAllCategories = async (req,res) => {
    //Pagenation
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit *1 || 5;
    const skip = (page -1) * limit ;
    const categories = await Category.find().skip(skip).limit(limit);
    res.status(200).json(categories);
};

// @route PUT /api/v1/categories/:id
// @access Private
export const updateCategory = asyncHandler( async (req , res) => {
    const {name , description, image , featured } = req.body;
    const updateData = {}
    if (name) {
        updateData.name = name;
        updateData.slug = slugify(name); // Only re-slugify if name is provided
    }
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (featured !== undefined) updateData.featured = featured;

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id ,
        updateData ,
        {new : true , runValidators : true});

    if(!updatedCategory) return next(new ApiError("category not found for update" , 404));
    res.status(200).json(updatedCategory);
});

// @route PUT /api/v1/categories/:id
// @access Private
export const deleteCategory = asyncHandler( async (req,res) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if(!deletedCategory) return res.status(404).json({message : "Category not found"});
    res.status(200).json(deletedCategory);
});
