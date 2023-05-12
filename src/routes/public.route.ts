import { Router } from "express";
import { create, customerList, deleteCustomer, getByOne, update } from "../components/admin/customer.component";

const publicRouter = Router();

publicRouter.post('/create/customer', create);
publicRouter.get('/customer', customerList);
publicRouter.get('/getByOne/:id', getByOne);
publicRouter.post('/delete/customer/:id', deleteCustomer);
publicRouter.put('/update/:id', update);

export default publicRouter;