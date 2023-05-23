import { Request, Response } from "express";
import productModel from "../../models/product.model";

const create = async (req: Request, res: Response) => {
    try {
        const { name, category, inventry, price, description, image, tags } = req.body;
        if (!name) return res.status(400).send({ error: true, message: "name is required", response: null });
        if (!category) return res.status(400).send({ error: true, message: "category is required", response: null });
        if (!inventry) return res.status(400).send({ error: true, message: "inventry is required", response: null });
        if (!price) return res.status(400).send({ error: true, message: "price is required", response: null });
        if (!description) return res.status(400).send({ error: true, message: "description is required", response: null });
        if (!image) return res.status(400).send({ error: true, message: "image is required", response: null });
        if (!tags) return res.status(400).send({ error: true, message: "tags is required", response: null });

        const data = await productModel.create({ name, category, inventry, price, description, image, tags });
        return res.status(200).send({
            error: false,
            message: "product created successfully",
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

export default { create }