import { Schema, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true
});

const productModel = model('Product', schema);
export default productModel;