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
    inventry: {
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
    },
    tags: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
}, {
    timestamps: true
});

const productModel = model('Products', schema);
export default productModel;