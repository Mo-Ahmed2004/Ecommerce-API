import Category from "../models/Category";

export const getCategoryById = async (req , res) => {
    try{
        const category = await Category.findById(req.params.id);
        if(!category) return res.status(404).json({message : "Category not found"});
        res.status(200).json(category);


    }catch (err) {
       res.status(500).json({message : err.message}); 
    }

};

export const updateCategory = async (req , res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id ,
             req.body ,
            {new : true , runValidators : true});
        if(!updatedCategory) return res.status(404).json({message : "Category not found"});
        res.status(200).json(updatedCategory);

    } catch (err) {
        res.status(400).json({message : err.message});
    }
};

export const deleteCategory = async (req,res) => {
    try {
        const deletedCategory = await Category.findById(req.params.id);
        if(!deletedCategory) return res.status(404).json({message : "Category not found"});
        res.status(200).json(deletedCategory);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
};

export const createCategory = async (req,res) => {
    try {
        const category = new category (req.body);
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);

    } catch (err) {
        res.status(400).json({message : err.message});
    }
};

export const getAllCategories = async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (err) {
        res.status(500).json({message : err.message});
    }
};
