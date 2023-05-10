import { Request, Response } from "express";
import adminModel from "../../models/admin.model";
const jwt = require('jsonwebtoken');

const signUp = async (req: Request, res: Response) => {
    try {
        let { name, email, password, phone, roles } = req.body;
        if (!name) return res.status(400).send({ error: true, message: "name is required", response: null });
        if (!email) return res.status(400).send({ error: true, message: "email is required", response: null });
        if (!password) return res.status(400).send({ error: true, message: "password is required", response: null });
        if (!phone) return res.status(400).send({ error: true, message: "phone is required", response: null });
        if (!roles) return res.status(400).send({ error: true, message: "roles is required", response: null });

        let alreadyExists = await adminModel.findOne({ email });
        if (alreadyExists) return res.status(400).send({ error: true, message: "email already exists", response: null });


        const data = await adminModel.create({ name, email, password, phone, roles });
        return res.status(200).send({
            error: false,
            message: "sign up successfully",
            response: data
        });
    } catch (_: any) {
        const error = _ as Error
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).send({ error: true, message: "email is rquired", response: null });
        if (!password) return res.status(400).send({ error: true, message: "password is rquired", response: null });
        // const ss = await adminModel.aggregate([
        //     {
        //         $lookup: {
        //             from: 'roles',//databases mai jo bhi table ka name ho
        //             localField: 'roles',// admin model mai reference name 
        //             foreignField: '_id',//roles tables _id
        //             as: 'role_id' //jis name se display krwana ho
        //         }
        //     }
        // ]);
        // console.log(ss);
        const data = await adminModel.findOne({ email, password });

        if (!data) return res.status(401).send({
            error: true,
            message: "Invalid user email and/or password!",
            response: null
        });
        const token = jwt.sign({ data: 'dilip' }, 'shopings', { expiresIn: 60 * 60 });
        return res.status(200).send({
            error: false,
            message: "login successfully",
            response: { data, token }
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

export { signUp, signIn };