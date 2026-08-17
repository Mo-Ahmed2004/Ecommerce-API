import mongoose from "mongoose"

const productsSchema = new mongoose.Schema({
    title:  {
        required : true,
        type : String
    },

    brand:  {
        required : true,
        type : String
    },

    price :  {
        required : true,
        type : Number
    },

    stock:  {
        required : true,
        type : Number,
        default : 0
    },

    categoryId:  {
        required : true,
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },

    isAvailable:{
        type : Boolean,
        default : true
    },

    specs: { 
        ram:  {
        required : true,
        type : String
    },
        storage: {
        required : true,
        type : String
    }

    }
} , {timestamps : true});


export default mongoose.model("Product" , productsSchema);