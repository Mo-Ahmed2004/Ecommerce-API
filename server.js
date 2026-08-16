import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded());


const PORT = process.env.PORT || 3000;
//starting the server (local host)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
