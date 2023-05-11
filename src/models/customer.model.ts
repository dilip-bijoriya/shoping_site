import { Schema, model } from "mongoose";
const schema = new Schema({
    name: {
        fname: {
            type: String,
            required: true,
            trim: true
        },
        lname: {
            type: String,
            required: true,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },
    verified: {
        email: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
});

const customerModel = model('Customer', schema);
export default customerModel;