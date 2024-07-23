import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.send("Hello World");
};




export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "You can only update your own account"));
  try {
    if (req.body.password)
      req.body.password = bcrypt.hashSync(req.body.password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};



export const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.id)
    return next(errorHandler(403, "You can only delete your own account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("token_access");
    res.status(200).json("User has been deleted");
    
  }
  catch(error){
    next(errorHandler(500, "Internal Server Error"));
  }
}