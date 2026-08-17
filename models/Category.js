import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true ,
        required : true,
        trim : true,
    },

    slug : {
        type : String,
        unique : true ,
        lowercase : true,
        trim : true,
    },

    description : {
        type : String,
        required : true,
        trim : true,
    },

    featured : {
        type : Boolean,
        default : false
    }

} , 
{timestamps : true});


export default mongoose.model('Category', categorySchema); 
//first parameter tells mongoDB to create a collection with name => categories and using the second param as a blueprint


