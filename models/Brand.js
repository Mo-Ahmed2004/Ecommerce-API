import mongoose from "mongoose";

const brandScehma = new mongoose.Schema ({
    name : {
        type : [String , "Brand must be a string"],
        unique : [true , "Brand must be unique"] ,
        required : [true , "Brand field is requierd"],
        minlngth : [3 , "too short Brand name"],
        maxlength : [32 , "too long Brand name"],
        trim : true,
    },

    slug : {
        type : String,
        unique : true ,
        lowercase : true,
    },

    image : {
        type : String, 
        required : true 
    }
    
} , {timestamps : true});


export default mongoose.model("Brand" , brandScehma);