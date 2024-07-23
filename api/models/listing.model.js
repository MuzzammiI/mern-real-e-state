import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
},{timestamps: true}
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
