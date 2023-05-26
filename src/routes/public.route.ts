import { Router } from "express";
import auth from "../components/public/authentication.component"

const publicRouter = Router();

publicRouter.post('/createAccount', auth.createAccount);
publicRouter.post('/loginAccount', auth.loginAccount);

export default publicRouter;