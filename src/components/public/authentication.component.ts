import { Request, Response } from "express";
import customerModel from "../../models/customer.model";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import sendEmail from "../../configs/email.config";
import EmailVerifyTemplate from "../../templets/emailVerify.template";
import client from "../../configs/redis.config";
import { getFullName } from "../../util/validations.util";
import ForgetPasswordTemplate from "../../templets/forgetPassword.template";

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
            await client.setEx(key, 60 * 10, data?._id.toString() || '');
            sendEmail(data?.email, 'Email Verification', EmailVerifyTemplate(key, getFullName(data?.name)));
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

const userVerificationStatus = async (req: Request, res: Response) => {
    try {
        const userId = req.params._id;
        const user = await customerModel.findOne({ _id: userId })

        if (!user) return res.status(404).send({
            error: true,
            message: "No user found related to this user id"
        });

        if (user.verified?.email) {
            return res.status(200).send({
                error: false,
                response: {
                    verified: true,
                    message: 'This user email address verified.'
                }
            });
        }

        return res.status(200).send({
            error: false,
            response: {
                verified: false,
                message: 'This user email address NOT verified yet.'
            }
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

const emailVerify = async (req: Request, res: Response) => {
    try {
        const key = req.params.key;
        if (!key) return res.status(400).send({
            error: false,
            message: "key not found."
        });
        const _id = await client.get(key);
        if (!_id) return res.status(400).send({
            error: false,
            message: "invalid token."
        });
        const customer = await customerModel.findOne({ _id });
        if (!customer) return res.status(404).send({
            error: false,
            message: "no account found related to this link."
        });
        if (!customer.verified) customer.verified = {
            email: false,
            phone: false
        };
        customer.verified.email = true;
        await customer.save();
        const redirect_url = (process.env.AFTER_EMAIL_VFY_REDIRECT_URL || '');
        if (!redirect_url)
            return res.status(200).send({
                error: false,
                message: "email verified!",
                data: null
            });
        return res.redirect(301, `${redirect_url}/${_id}`);
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        })
    }
}

const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).send({ error: true, message: "email is required", response: null });
        const data = await customerModel.findOne({ email: email });
        const key = uuidv4();
        await client.setEx(key, 60 * 10, data?._id.toString() || ' ');

        {
            // send email
            sendEmail(data?.email, 'Email Verification', ForgetPasswordTemplate(key, getFullName(data?.name)));
        }

        return res.status(200).send({
            error: false,
            message: "email sent successfully",
            response: ""
        });
    } catch (error: any) {
        console.log(error)
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

const resetPassword = async (req: Request, res: Response) => {
    try {
        const { key, password, confirmPassword } = req.body;
        if (!key) return res.status(404).send({ error: true, message: "key is required", response: null });
        if (!password) return res.status(404).send({ error: true, message: "password is required", response: null });
        if (!confirmPassword) return res.status(404).send({ error: true, message: "Confirm password is required", response: null });
        const id = await client.get(key);
        if (!id) return res.status(403).send({ error: true, message: "Key expired!", response: null });
        await customerModel.findOneAndUpdate({ _id: id }, { $set: { password: password } });
        await client.del(key);
        return res.status(200).send({
            error: false,
            message: "Password successfully updated..",
            response: null
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

export default { createAccount, loginAccount, emailVerify, forgotPassword, resetPassword, userVerificationStatus }