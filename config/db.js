import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Data Base Connected Successfully");
    }catch {
        console.log("Data Base Connection Failed");
        //fast fail indicator
        process.exit(1);
    }
}

export default connectDB;