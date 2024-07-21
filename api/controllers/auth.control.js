import expres from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import   {errorHandler}  from '../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashedPassword= bcrypt.hashSync(password,10);
    const user = new User({ name, email, password:hashedPassword });
    try {
        await user.save();
        res.status(201).json("user created successfully");
    } 
    catch (error) {
        next(errorHandler(502,"user creating server error"));
    }
}



export const signin = async (req,res,next)=>{
    const {email,password} = req.body;
    try{
        const uservalidate = await User.findOne({email});
        if(!uservalidate) return next(errorHandler(502,"Invalid UserId or Password"));
        const passwordValidate = bcrypt.compareSync(password,uservalidate.password);
        
        if(!passwordValidate) return next(errorHandler(502,"Invalid UserId or Password"));
        const {password:pass, ...restdata} = uservalidate._doc;
        const token = jwt.sign({id:uservalidate._id},process.env.JWT_SECRET)
        res
        .cookie('token',token,{httpOnly:true, expire:new Date()+9999})
        .status(200)
        .json(restdata);
        
    }
    catch(error){
        next(errorHandler(502,"Bad Credentials"));

    }
}


export const google = async (req,res,next)=>{
    try {
        const user =await User.findOne ({email:req.body.email});
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password, ...restdata} = user._doc;
            res.
            cookie('token',token,{httpOnly:true, expire:new Date()+9999})
            .status(200)
            .json(restdata);
        }
        else
        {
            const paswordGenerated = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            // const hsasedPassword = bcrypt.hashSync(paswordGenerated,10);
            const newUser = new User({
                name:req.body.name.split(' ').join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email:req.body.email,
                password:bcrypt.hashSync(paswordGenerated,10),
                avatar:req.body.photo,
            });
            await newUser.save(); 
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password, ...restdata} = newUser._doc;
            res
            .cookie('token',token,{httpOnly:true, expire:new Date()+9999})
            .status(200)
            .json(restdata);
             
        }
        
    } catch (error) {
        
    }
}
