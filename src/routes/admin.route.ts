import { Router } from "express";
import { signUp } from "src/components/admin/admin.component";

const adminRouter = Router();
// admin api's
adminRouter.post('/api/signUp', signUp);

export default adminRouter;