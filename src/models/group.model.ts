import { Schema, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    discription: {
        type: String,
        required: true,
        trim: true
    },
    filter: {
        type: String,
        required: true,
        trim: true,
        enum: ["category", "color", "sizes", "waither"]
    }
}, {
    timestamps: true
});

const groupModel = model('Group', schema);
export default groupModel;