import { Request, Response } from "express";
import customerModel from "../../models/customer.model";
const create = async (req: Request, res: Response) => {
    try {
        const { email, password, phone, name } = req.body;
        if (!email) return res.status(400).send({ error: true, message: "email is required", response: null });
        if (!password) return res.status(400).send({ error: true, message: "password is required", response: null });
        if (!phone) return res.status(400).send({ error: true, message: "phone is required", response: null });
        const { fname, lname } = name;
        if (!fname) return res.status(400).send({ error: true, message: "fisrt name is required", response: null });
        if (!lname) return res.status(400).send({ error: true, message: "last name is required", response: null });
        let object = { name, email, password, phone };
        const data = await customerModel.create(object);
        return res.status(200).send({
            error: false,
            message: "customer successfully create",
            response: data
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        })
    }
}

export { create };