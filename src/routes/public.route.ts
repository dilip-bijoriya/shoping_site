import { Router } from "express";
import { create } from "../components/admin/customer.component";

const publicRouter = Router();

publicRouter.post('/create/customer', create);

export default publicRouter;