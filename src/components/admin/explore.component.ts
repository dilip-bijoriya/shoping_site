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
        })
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

export default { create }