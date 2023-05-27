import { Router } from "express";
import auth from "../components/public/authentication.component"

const publicRouter = Router();

publicRouter.post('/createAccount', auth.createAccount);
publicRouter.post('/loginAccount', auth.loginAccount);
publicRouter.post("/api/forgotPassword", auth.forgotPassword);
publicRouter.get("/api/emailVerify/:key", auth.emailVerify);
publicRouter.post("/api/resetPassword", auth.resetPassword);

export default publicRouter;