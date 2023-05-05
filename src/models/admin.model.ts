import { Schema, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: Number,
        trim: true,
        required: true
    },
    roles: {
        type: Schema.Types.ObjectId,
        ref: "role",
    },
    editable: Boolean,
    deletable: Boolean
}, {
    timestamps: true
});

const adminModel = model('admin', schema);
export default adminModel;