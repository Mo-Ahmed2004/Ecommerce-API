import Category from "../models/Category.js";
import slugify from "slugify";

// @route POST /api/v1/categories
// @access Private
export const createCategory = async (req,res) => {
    try {
        const {name , description, image} = req.body;
        const category = new Category ({
            name ,
            description,
            image,
            slug : slugify(name)
        }); // => creating new document
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);

    } catch (err) {
        res.status(400).json({message : err.message});
    }
};

// @route GET /api/v1/categories
// access Private
export const getCategoryById = async (req , res) => {
    try{
        const category = await Category.findById(req.params.id);
        if(!category) return res.status(404).json({message : "Category not found"});
        res.status(200).json(category);


    }catch (err) {
       res.status(500).json({message : err.message}); 
    }

};
export const getAllCategories = async (req,res) => {
    try {
        //Pagenation
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit *1 || 5;
        const skip = (page -1) * limit ;
        const categories = await Category.find().skip(skip).limit(limit);
        res.status(200).json(categories);

    } catch (err) {
        res.status(500).json({message : err.message});
    }
};

// @route PUT /api/v1/categories/:id
// @access Private
export const updateCategory = async (req , res) => {
    try {
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

        if(!updatedCategory) return res.status(404).json({message : "Category not found"});
        res.status(200).json(updatedCategory);

    } catch (err) {
        res.status(400).json({message : err.message});
    }
};

// @route PUT /api/v1/categories/:id
// @access Private
export const deleteCategory = async (req,res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if(!deletedCategory) return res.status(404).json({message : "Category not found"});
        res.status(200).json(deletedCategory);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
};
