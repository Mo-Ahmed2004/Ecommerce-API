import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({

    name: {
        required : [true , "name is requiered"],
        type : String,
        trim : true,
    },

    slug: {
        type : String,
        lowercase : true
    },
   
    email:  {
        required : [true , "email is required"],
        type : String,
        unique : true,
        lowercase : true, 
    },

    password:  {
        required : [true , "password is required"],
        type : String,
        minLength : [6 , "too short password"]
    },

    phone:  {
        required : true,
        type : String,
        unique : true,
    },

    profileImage : String,

    role:  {
        type : String,
        enum : ["admin" , "user"],
        default : "user"
    },

} , {timestamps : true});

export default mongoose.model("User" , usersSchema);