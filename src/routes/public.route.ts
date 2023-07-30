import { Router } from "express";
import auth from "../components/public/authentication.component"
import product from "../components/public/product.component";

const publicRouter = Router();

publicRouter.post('/createAccount', auth.createAccount);
publicRouter.post('/loginAccount', auth.loginAccount);
publicRouter.post("/forgotPassword", auth.forgotPassword);
publicRouter.get("/emailVerify/:key", auth.emailVerify);
publicRouter.post("/resetPassword", auth.resetPassword);
publicRouter.get("/verificatinStatus/:_id", auth.userVerificationStatus)

// products api's

publicRouter.get("/products", product.products);
publicRouter.get("/products/getById/:id", product.getById)

export default publicRouter;