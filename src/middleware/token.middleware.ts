import { NextFunction, Request, Response } from "express";
import adminModel from "../models/admin.model";
import { JwtPayloadType } from "../types/jwt.interface";
import { RolesKeyEnum } from "../types/roles.types";
const jwt = require('jsonwebtoken');

const verifyTokenMD = async (req: Request, res: Response, next: NextFunction) => {
    let barierToken: string = (req.headers["authorization"] || '') as unknown as string;
    if (!barierToken) return res.status(401).send({ error: "Unauthorize user" });
    try {
        console.log(barierToken)
        let [Bearer, Token] = barierToken.split(' ');
        const decode: JwtPayloadType = jwt.verify(Token, "shopings");
        // get admin details by id from db
        const data = await adminModel.findOne({ _id: decode.adminId })
        if (!data) return res.status(401).send({ error: "Unauthorize user" });
        req.admin = {
            _id: data._id.toString(),
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone.toString(),
            roles: data.roles as unknown as { [key in RolesKeyEnum]: boolean },
            editable: data.editable || false,
            deletable: data.deletable || false,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
        next();
    } catch (error: any) {
        return res.status(400).send({ error: error.message });
    }
};

export default verifyTokenMD;

