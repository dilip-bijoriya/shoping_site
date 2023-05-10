import { Router } from "express";
import { signIn, signUp } from "../components/admin/admin.component";

const adminRouter = Router();
// admin api's
adminRouter.post('/signUp', signUp);
adminRouter.post('/signIn', signIn);

export default adminRouter;