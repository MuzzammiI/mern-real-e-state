import expres from 'express';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword= bcrypt.hashSync(password,10);
    const user = new User({ name, email, password:hashedPassword });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

