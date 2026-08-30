import mongoose, { Types } from "mongoose"

const productsSchema = new mongoose.Schema({
    title:  {
        required :[ true , "Product title is requeired"],
        type : String,
        minlngth : [10 , "too short Product name"],
        maxlength : [100 , "too long Product name"],
        trim : true
    },

    slug : {
        type : String,
        unique : true ,
        lowercase : true,
    },

    description : {
        type : String,
        required : [true, "product desception is requeiered"],
        trim : true,
        minlngth : [20 , "too short "],
        maxlength : [2000 , "too long "]
    },

    price :  {
        required : [true , "Price must be stated"],
        type : Number
    },

    priceAfterDiscount : {
        type : Number
    },

    stock:  {
        required : [true , "Product quantity is requeiered"],
        type : Number,
    },

    sold : {
        type : Number,
        default : 0
    },


    category:  {
        required : [true , "Product must be referenced to Category"],
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category" 
    },

    subCategory: [{
        required : [true , "product must reference to subCategory"],
        type : mongoose.Schema.Types.ObjectId,
        ref : "SubCategory"
    }],


    brand:  {
        required : [true , "Product must be referenced to brand"],
        type : mongoose.Schema.Types.ObjectId,
        ref : "Brand" 
    },

    isAvailable:{
        type : Boolean,
        default : true
    },


    imageCover : {
        type : [String , "there must be at least image cover"], 
        required : true 
    },

    images : [String],

    colors : [String],

    ratingAverage : {
        type : Number,
        min : [1 , "Minimu rating avg is 1"],
        max : [5 , "Max rating is 5"],
        default : 0
    },

    ratingQuantity : {
        type : Number,
        default : 0
    }

} , {timestamps : true});


export default mongoose.model("Product" , productsSchema);