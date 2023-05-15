import { Schema, model } from "mongoose";
import { RolesKeyEnum } from "../types/roles.types";

const Objects: any = {};
for (let key in RolesKeyEnum) {
    Objects[key] = {
        type: Boolean,
        default: false
    }
}

const schema = new Schema({
    name: {
        type: String
    },
    description: Objects,
    roles: Objects
});

const roleModel = model('role', schema);
export default roleModel;