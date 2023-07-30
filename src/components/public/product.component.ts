import { Request, Response } from "express";
import productModel from "../../models/product.model";

const products = async (req: Request, res: Response) => {
    try {
        const data = await productModel.find();
        const total = await productModel.count();
        res.status(200).send({
            error: false,
            message: "success",
            response: { data, total }
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).send({
            error: true,
            message: error.message,
            response: null
        });
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const data = await productModel.findOne({ _id: req.params.id });
        res.status(200).send({
            error: false,
            message: "success",
            response: data
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).send({
            error: true,
            message: error.message,
            response: null
        });
    }
}

export default { products, getById }