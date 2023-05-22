import { Request, Response } from "express";
import groupModel from "../../models/group.model";

const createGroup = async (req: Request, res: Response) => {
    try {
        const { name, discription, filter } = req.body;
        if (!name) return res.status(400).send({ error: true, message: "name is required", response: null });
        if (!discription) return res.status(400).send({ error: true, message: "discription is required", response: null });
        if (!filter) return res.status(400).send({ error: true, message: "filter is required", response: null });
        const data = await groupModel.create({ name, discription, filter });
        return res.status(200).send({
            error: false,
            message: "Group created successfully!",
            response: data
        })
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
        const { id } = req.params;
        const { name, discription, filter } = req.body;
        const data = await groupModel.findByIdAndUpdate(id, { name, discription, filter }, { new: true });
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

export default { createGroup, updateGroup, deleteGroup, groupList, getByOne }