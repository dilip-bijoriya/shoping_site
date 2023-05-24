import { ObjectId } from "mongoose";
import { RolesKeyEnum } from "./roles.types";

declare global {
    namespace Express {
        interface Request {
            admin: {
                _id: string | ObjectId
                name: string,
                email: string,
                password: string,
                phone: string,
                roles: { [key in RolesKeyEnum]: boolean },
                editable: Boolean,
                deletable: Boolean,
                createdAt: Date,
                updatedAt: Date
            }
        }
        interface Response {
            return: (code: number, success: boolean, data: any, errorMessages?: string[]) => any
        }
    }
}