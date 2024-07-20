import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.routes.js";
dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})



app.use("/api/user",userRouter);







app.listen(3000, () => { 
  console.log("Server is running on port 3000");
});
