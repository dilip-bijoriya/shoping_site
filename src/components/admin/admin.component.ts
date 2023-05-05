import { Request, Response } from "express";
import adminModel from "src/models/admin.model";

const signUp = async (req: Request, res: Response) => {
    try {
        let { name, email, password, phone, roles } = req.body;
        if (!name) return res.status(400).send({ error: true, message: "name is required", response: null });
        if (!email) return res.status(400).send({ error: true, message: "email is required", response: null });
        if (!password) return res.status(400).send({ error: true, message: "password is required", response: null });
        if (!phone) return res.status(400).send({ error: true, message: "phone is required", response: null });
        if (!roles) return res.status(400).send({ error: true, message: "roles is required", response: null });

        let alreadyExists = await adminModel.findOne({ email });
        if (alreadyExists) {
            return res.status(400).send({ error: true, message: "email already exists", response: null });
        }

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


export { signUp };