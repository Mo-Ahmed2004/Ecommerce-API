import Brand from "../models/Brand.js";
import slugify from "slugify";
import asyncHanlder from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

// @desc creating Brand and ref it to parent
// @route POST /api/v1/brands
// @access Private
export const createBrand = asyncHanlder(async(req , res) => {
    const {name , image} = req.body;
    const Brand = new Brand ({
        name : name,
        slug : slugify(name),
        image : image
    });
    const savedBrand = await Brand.save();
    res.status(201).json(savedBrand);
});

// @desc getting all childs of a Brand
// @route GET /api/v1/brands/id
// @access Puplic
export const getBrand = asyncHanlder(async(req , res) => {
    const {id} = req.params;
    const Brand = await Brand.findById(id);
    if(!Brand) {return next(new ApiError("there is no brand with this id" , 404));}
    res.status(200).json(Brand);
});

//categories/:categoryId/subcategories/:subCategoryId/brands
export const getAllBrands = asyncHanlder(async(req , res) => {
    const features = new ApiFeatures(Brand.find() , req.query)
    .filter()
    .search()
    .sorting()
    .pagination()
    .fieldLimiting();
    const brands = await features.baseQuery;
    res.status(200).json(brands);
});

// @desc updating Brand
// @route PUT /api/v1/brands/:id
// @access Private
export const updateBrand = asyncHanlder(async(req , res) => {
    const {name , BrandId} = req.body;
    const updateData = {}
    if (name) {
        updateData.name = name;
        updateData.slug = slugify(name);
    }

    if(BrandId){
        updateData.BrandId = BrandId ;
    }
    
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id ,
        updateData ,
        {new : true , runValidators : true});

    if(!updatedBrand) return next(new ApiError("Brand not found for update" , 404));
    res.status(200).json(updatedBrand);
});

// @desc deleteing Brand
// @route Delete /api/v1/brands/:id
// @access Private
export const deleteBrand = asyncHanlder(async (req , res) => {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if(!deletedBrand) return next (new ApiError("Brand not found" , 404));
    res.status(200).json(deletedBrand);
});
