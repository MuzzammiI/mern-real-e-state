import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})
app.use(express.json());





app.use("/api/user",userRouter);
app.use ("/api/auth",authRouter)


//middleware applied 

app.use((error,req,res,next)=>{
  const statusCode = error.statusCode || 500;
  const messgage = error.messgage || "Internal Server Error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    messgage
  });
}); 






app.listen(3000, () => { 
  console.log("Server is running on port 3000");
});
