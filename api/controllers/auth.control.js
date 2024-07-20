import expres from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import   {errorHandler}  from '../utils/error.js';


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

