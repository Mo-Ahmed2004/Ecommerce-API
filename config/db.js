import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Data Base Connected Successfully");
}

export default connectDB;