import SubCategory from "../models/SubCategory.js";
import slugify from "slugify";
import asyncHanlder from "express-async-handler";
import ApiError from "../utils/apiError.js";

// @desc creating subcategory and ref it to parent
// @route POST /api/v1/subcategories
// @access Private
export const createSubCategory = asyncHanlder(async(req , res) => {
    const {name ,categoryId} = req.body;
    const subCategory = new SubCategory ({
        name : name,
        slug : slugify(name),
        categoryId : categoryId
    });
    const savedSubCategory = await subCategory.save();
    res.status(201).json(savedSubCategory);
});

// @desc getting all childs of a category
// @route GET /api/v1/subcategories/id
// @access Puplic
export const getSubCategory = asyncHanlder(async(req , res) => {
    const {id} = req.params;
    const subCategory = await SubCategory.findById(id).populate({path : "categoryId" , select : "name -_id"});
    if(!subCategory) {return next(new ApiError("there is no sub categories for this category" , 404));}
    res.status(200).json(subCategory);
});

export const getAllSubCategories = asyncHanlder(async(req , res) => {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit *1 || 5;
        const skip = (page -1) * limit ;
        const filterObj = {}
        
        if(req.params.categoryId){
            filterObj.categoryId = req.params.categoryId;
        }
        
        if(req.query.categoryId){
           filterObj.categoryId = req.query.categoryId;
        }
        const subCategories = await SubCategory.find(filterObj).skip(skip).limit(limit).populate({path : "categoryId" , select : "name -_id"});
        res.status(200).json(subCategories);
});

// @desc updating subcategory
// @route PUT /api/v1/subcategories/:id
// @access Private
export const updateSubCategory = asyncHanlder(async(req , res) => {
    const {name , categoryId} = req.body;
    const updateData = {}
    if (name) {
        updateData.name = name;
        updateData.slug = slugify(name);
    }

    if(categoryId){
        updateData.categoryId = categoryId ;
    }
    
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id ,
        updateData ,
        {new : true , runValidators : true});

    if(!updatedSubCategory) return next(new ApiError("Subcategory not found for update" , 404));
    res.status(200).json(updatedSubCategory);
});

// @desc deleteing subcategory
// @route Delete /api/v1/subcategories/:id
// @access Private
export const deleteSubCategory = asyncHanlder(async (req , res) => {
    const deletedSubCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if(!deletedSubCategory) return next (new ApiError("subCategory not found" , 404));
    res.status(200).json(deletedSubCategory);
});
