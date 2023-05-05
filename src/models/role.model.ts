import { Schema, model } from "mongoose";
import { RolesKeyEnum } from "../types/roles.types";

const schema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String,
    },
    roles: Object.values(RolesKeyEnum).map(each => ({ [each]: Boolean }))
});

const roleModel = model('role', schema);
export default roleModel;