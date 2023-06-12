import { Request, Response } from "express";
import productModel from "../../models/product.model";
import { checkPermission } from "../../util/checkPermissions.util";
import { RolesKeyEnum } from "../../types/roles.types";

const create = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.create_product)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

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

const update = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.update_product)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

        const { id } = req.params;
        const { name, category, inventry, price, description, image, tags } = req.body;
        const data = await productModel.findByIdAndUpdate(id, { name, category, inventry, price, description, image, tags });
        return res.status(200).send({
            error: false,
            message: "product update successfully!",
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

const productList = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.view_product)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

        let { limit, page }: any = req.query;
        let search = req.query?.search || '';
        limit = Number(limit);
        page = Number(page);

        if (!limit) limit = 10;
        if (!page) page = 1;
        let skip = (page - 1) * limit;
        const data = await productModel.find({ name: { $regex: search, $options: "i" } }).skip(skip).limit(limit);
        const total = await productModel.count();
        return res.status(200).send({
            error: false,
            message: "success",
            response: { data, total }
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.delete_product)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

        const data = await productModel.deleteOne({ _id: req.params.id });
        return res.status(200).send({
            error: false,
            message: "product deleted successfully",
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

const productGetByOne = async (req: Request, res: Response) => {
    try {
        const data = await productModel.findOne({ _id: req.params.id });
        return res.status(200).send({
            error: false,
            message: "success",
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

export default { create, update, productList, deleteProduct, productGetByOne };