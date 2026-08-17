import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({

    firstName: {
        required : true,
        type : String,
        trim : true,
    },
    lastName:  {
        required : true,
        type : String,
        trim : true,
    },

    email:  {
        required : true,
        type : String,
        unique : true,
        lowercase : true, 
    },

    password:  {
        required : true,
        type : String,
    },

    phone:  {
        required : true,
        type : String,
        unique : true,
    },

    role:  {
        type : String,
        enum : ["admin" , "customer"],
        default : "customer"
    },

    isActive: {
        type : Boolean,
        default : true, //once signed in you can shop , make it false if you wanna verify the acccount after logging.
    }
} , {timestamps : true});

export default mongoose.model("User" , usersSchema);