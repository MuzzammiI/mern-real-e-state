import errorHandler from "./error.js";
import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const datatoken = req.cookies.token_access;

    if (!datatoken) return next(errorHandler(401, "Unauthorized access"));

    jwt.verify(datatoken, process.env.JWT_SECRET , (err, user) => {
        if (err) return next(errorHandler(403, "Forbidden access"));
        req.user = user;
        next();
    });
};
