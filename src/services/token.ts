import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers["Authorization"];
    if (!token) return res.status(401).send({ error: "Unauthorize user" });
    try {
        const decode = jwt.verify(token, "shopings");
        req.admin = decode;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
};

export default verifyToken;

