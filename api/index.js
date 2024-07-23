import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.routes.js";

dotenv.config();


const app = express();

mongoose.connect(process.env.MONGO).then(()=>{
  console.log("Connected to MongoDB");
})
.catch((err)=>{
  console.log(err);
})
app.use(express.json());
app.use(cookieParser());


// app.use(cookieParser());





// Set a cookie

// app.get("/set-cookie", (req, res) => {
//   res.cookie("access_token", "djfhksdhufhed4sf45516513dkheiuue", {
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === "production",
//   });
//   res.send("Cookie set!");

// });


// // Get the cookie

// app.get("/get-cookie", (req, res) => {
//   console.log(req.cookies); // Should print the cookie object
//   res.send("Cookie retrieved!");
// });




app.use("/api/user",userRouter);
app.use ("/api/auth",authRouter)
app.use("/api/listing",listingRouter);





//middleware applied 

app.use((error,req,res,next)=>{
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  });
}); 


// app.use((error,req,res)=>{
//   const statusCode = error.statusCode || 500;
//   const message = error.message || "Internal Server Error";
//   return
//   res.status(statusCode).json({
//     success:false,
//     statusCode,
//     message
//   })
// })




app.listen(3000, () => { 
  console.log("Server is running on port 3000");
});
