import { Request, Response } from "express";
import groupModel from "../../models/group.model";
import { checkPermission } from "../../util/checkPermissions.util";
import { RolesKeyEnum } from "../../types/roles.types";

const createGroup = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.create_group)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

        const { name, description, filter } = req.body;
        if (!name) return res.status(400).send({ error: true, message: "name is required", response: null });
        if (!description) return res.status(400).send({ error: true, message: "description is required", response: null });
        if (!filter) return res.status(400).send({ error: true, message: "filter is required", response: null });
        const data = await groupModel.create({ name, description, filter });
        return res.status(200).send({
            error: false,
            message: "Group created successfully!",
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

const updateGroup = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.update_group)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

        const { id } = req.params;
        const { name, description, filter } = req.body;
        if (!name) return res.status(400).send({ error: true, message: "name is required", response: null });
        if (!description) return res.status(400).send({ error: true, message: "description is required", response: null });
        const data = await groupModel.findByIdAndUpdate(id, { name, description, filter }, { new: true });
        return res.status(200).send({
            error: false,
            message: "Group updated successfully!",
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

const deleteGroup = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.delete_group)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

        const data = await groupModel.deleteOne({ _id: req.params.id });
        return res.status(200).send({
            error: false,
            message: "group deleted successfully",
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

const groupList = async (req: Request, res: Response) => {
    try {
        const admin = req.admin;
        if (!await checkPermission(admin.roles.toString(), RolesKeyEnum.view_group)) return res.status(403).send({
            error: true,
            message: 'Authrization Failed'
        });

        const data = await groupModel.find();
        const total = await groupModel.count();
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

const getByOne = async (req: Request, res: Response) => {
    try {
        const data = await groupModel.findOne({ _id: req.params.id });
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

export default { createGroup, updateGroup, deleteGroup, groupList, getByOne };