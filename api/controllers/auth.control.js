import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  try {
    await user.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(errorHandler(502, "User Already Exist"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const uservalidate = await User.findOne({ email });
    if (!uservalidate) return next(errorHandler(502, "Invalid UserId"));

    const passwordValidate = bcrypt.compareSync(
      password,
      uservalidate.password
    );

    if (!passwordValidate) return next(errorHandler(502, "Invalid Password"));

    // create token using user id
    const token = jwt.sign({ id: uservalidate._id }, process.env.JWT_SECRET);
    const { password: pass, ...restdata } = uservalidate._doc;

    console.log("token here");
    console.log(token);
    console.log("token end");

    res
      .cookie("token_access", token, { httpOnly: true })
      .status(200)
      .json(restdata);
  } catch (error) {
    next(errorHandler(502, "Signin Error"));
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...restdata } = user._doc;
      res
        .cookie("token_access", token, { httpOnly: true })
        .status(200)
        .json(restdata);
    } else {
      const paswordGenerated =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(paswordGenerated, 10);
      const newUser = new User({
        name:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      // console.log(token);
      const { password: pass, ...restdata } = newUser._doc;
      res
        .cookie("token_access", token, { httpOnly: true })
        .status(200)
        .json(restdata);
    }
  } catch (error) {
    next(errorHandler(502, "Google Signin Error"));
  }
};



export const signout = async (req, res, next) => {  
  try {
    res.clearCookie("token_access");
    res.status(200).json("Signout Successfully");
  } catch (error) {
    next(errorHandler(502, "Signout Error"));
  }
};
