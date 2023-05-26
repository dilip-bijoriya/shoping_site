import { Request, Response } from "express";
import customerModel from "../../models/customer.model";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import sendEmail from "../../configs/email.config";
import EmailVerifyTemplate from "../../templets/emailVerify.template";
import client from "../../configs/redis.config";

const createAccount = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!email) return res.status(400).send({ error: true, message: "email is required", response: null });
        if (!password) return res.status(400).send({ error: true, message: "password is required", response: null });
        if (!phone) return res.status(400).send({ error: true, message: "phone is required", response: null });
        const { fname, lname } = name
        if (!fname) return res.status(400).send({ error: true, message: "fname is required", response: null });
        if (!lname) return res.status(400).send({ error: true, message: "lname is required", response: null });
        let payload = { name, email, password, phone };

        const alreadyExists = await customerModel.findOne({ email });
        if (alreadyExists) {
            return res.status(400).send({ error: true, message: "User already exists", response: null });
        }
        const data = await customerModel.create(payload);
        return res.status(200).send({
            error: false,
            message: "Account created successfully",
            response: data
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

const loginAccount = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).send({ error: true, message: "email is required", response: null });
        if (!password) return res.status(400).send({ error: true, message: "password is required", response: null });
        const data = await customerModel.findOne({ email, password });
        console.log(data?._id);
        const token = jwt.sign({ data: 'dilip' }, 'shopings', { expiresIn: 60 * 60 });

        if (!data?.verified?.email) {
            const key: string = `email-verify-${uuidv4()}`;
            //   await client.setEx(key, 60 * 10, data?._id.toString());
            sendEmail(data?.email, 'Email Verification', EmailVerifyTemplate(key, data?.name))
            return res.status(400).send({
                error: true,
                message: "This account is NOT verified, We send an email to your register email address for verification.",
                response: null
            });
        }
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

export default { createAccount, loginAccount }