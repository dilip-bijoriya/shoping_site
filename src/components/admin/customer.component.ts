import { Request, Response } from "express";
import customerModel from "../../models/customer.model";
import { checkPermission } from "../../util/checkPermissions.util";
import { RolesKeyEnum } from "../../types/roles.types";

const customerList = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.view_Cuctomer)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

        let { limit, page }: any = req.query;
        let search = req.query?.search || '';
        if (!limit) limit = 10;
        if (!page) page = 1;
        let skip = (page - 1) * limit;

        const data = await customerModel.find({
            $or: [
                { 'name.fname': { $regex: search } },
                { 'name.lname': { $regex: search } },
                { email: { $regex: search } },
                { phone: { $regex: search } }
            ]
        }).skip(skip).limit(limit);
        const total = await customerModel.count();
        return res.status(200).send({
            error: false,
            message: "success",
            response: { data, total }
        });
    }
    catch (error: any) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

const getByOne = async (req: Request, res: Response) => {
    try {
        const data = await customerModel.findOne({ _id: req.params.id });
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

const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.delete_customer)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

        const data = await customerModel.deleteOne({ _id: req.params.id });
        return res.status(200).send({
            error: false,
            message: "customer delete successfully",
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

const create = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.create_customer)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

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

const update = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.update_customer)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

        const { id } = req.params;
        const { email, password, phone, name } = req.body;
        const { fname, lname } = name;
        const updateCustomer = await customerModel.findByIdAndUpdate(id, { name, email, password, phone }, { new: true });
        return res.status(200).send({
            error: false,
            message: "customer update successfully",
            response: updateCustomer
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

export default { create, update, customerList, getByOne, deleteCustomer };