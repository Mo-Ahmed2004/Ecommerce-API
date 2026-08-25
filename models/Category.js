import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name : {
        type : [String , "Category must be a string"],
        unique : [true , "Category must be unique"] ,
        required : [String , "Category field is requierd"],
        minlngth : [3 , "too short category name"],
        maxlength : [32 , "too long category name"],
        trim : true,
    },

    slug : {
        type : String,
        unique : true ,
        lowercase : true,
    },

    description : {
        type : String,
        required : true,
        trim : true,
    },

    featured : {
        type : Boolean,
        default : false
    },

    image : {
        type : String, 
        required : true 
    }

} , 
{timestamps : true});


export default mongoose.model('Category', categorySchema); 
//first parameter tells mongoDB to create a collection with name => categories and using the second param as a blueprint


