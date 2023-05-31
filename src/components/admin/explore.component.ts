import { Request, Response } from "express";
import exploreModel from "../../models/explore.model";

const create = async (req: Request, res: Response) => {
    try {
        const { start_date, end_date } = req.body;
        if (!start_date) return res.status(400).send({ error: true, message: "start_date is required", response: null });
        if (!end_date) return res.status(400).send({ error: true, message: "end_date is required", response: null });

        const { content } = req.body;
        if (!content) return res.status(400).send({ error: true, message: "content is required", response: null });

        const obj = { start_date, end_date, content };
        const data = await exploreModel.create(obj);
        return res.status(200).send({
            error: false,
            message: "Explore create successfully!",
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
        const { id } = req.params;
        const { start_date, end_date, content } = req.body;
        const data = await exploreModel.findByIdAndUpdate(id, { start_date, end_date, content });
        return res.status(200).send({
            error: false,
            message: "Explore update successfully!",
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

const getByOne = async (req: Request, res: Response) => {
    try {
        const data = await exploreModel.findOne({ _id: req.params.id });
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

const deleteExplore = async (req: Request, res: Response) => {
    try {
        const data = await exploreModel.deleteOne({ _id: req.params.id });
        return res.status(200).send({
            error: false,
            message: "Explore deleted successfully",
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

const ExploreList = async (req: Request, res: Response) => {
    try {
        let { limit, page }: any = req.query;
        limit = Number(limit);
        page = Number(page);

        if (!limit) limit = 10;
        if (!page) page = 1;
        let skip = (page - 1) * limit;

        const data = await exploreModel.find().skip(skip).limit(limit);
        const total = await exploreModel.count();
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

export default { create, update, getByOne, deleteExplore, ExploreList }