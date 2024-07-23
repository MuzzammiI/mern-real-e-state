import Listing from "../models/listing.model.js";
import errorHandler from "../utils/error.js";

export const  createlist = async (req, res, next) => {
    try {
        const newlist = new Listing(req.body);
        const data = await newlist.save();
        res.status(200).json(data);
    } catch (error) {
        next(errorHandler(500, "Listing creation failed "));
    }
    }

