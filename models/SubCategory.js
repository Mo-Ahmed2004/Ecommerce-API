import mongoose from "mongoose";

const subCategoryScehma = new mongoose.Schema ({
    name : {
        type : [String , "Category must be a string"],
        unique : [true , "Category must be unique"] ,
        required : [true , "Category field is requierd"],
        minlngth : [3 , "too short category name"],
        maxlength : [32 , "too long category name"],
        trim : true,
    },

    slug : {
        type : String,
        unique : true ,
        lowercase : true,
    },

    categoryId: {
        required : [true , "Reference Id must be stated"],
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },

    
} , {timestamps : true});


export default mongoose.model("SubCategory" , subCategoryScehma);