import { Router } from "express";
import { signIn, signUp } from "../components/admin/admin.component";
import verifyTokenMD from "../middleware/token.middleware";
import customers from "../components/admin/customer.component";
import group from "../components/admin/group.component";
import product from "../components/admin/product.component"
import expolre from "../components/admin/explore.component"

const adminRouter = Router();
// admin api's
adminRouter.post('/signUp', signUp);
adminRouter.post('/signIn', signIn);

adminRouter.post('/create/customer', verifyTokenMD, customers.create);
adminRouter.get('/customer', verifyTokenMD, customers.customerList);
adminRouter.get('/getByOne/:id', verifyTokenMD, customers.getByOne);
adminRouter.post('/delete/customer/:id', verifyTokenMD, customers.deleteCustomer);
adminRouter.put('/update/:id', verifyTokenMD, customers.update);

// group's api
adminRouter.post('/createGroup', verifyTokenMD, group.createGroup);
adminRouter.put('/updateGroup/:id', verifyTokenMD, group.updateGroup);
adminRouter.post('/deleteGroup/:id', verifyTokenMD, group.deleteGroup);
adminRouter.get('/groupList', verifyTokenMD, group.groupList);
adminRouter.get('/group/getByOne/:id', verifyTokenMD, group.getByOne);

// product's api
adminRouter.post('/createProduct', verifyTokenMD, product.create);
adminRouter.put('/updateProduct/:id', verifyTokenMD, product.update);
adminRouter.get('/productList', verifyTokenMD, product.productList);
adminRouter.post('/deleteProduct/:id', verifyTokenMD, product.deleteProduct);
adminRouter.get('/productGetByOne/:id', verifyTokenMD, product.productGetByOne);

// explor's api
adminRouter.post('/createExplore', expolre.create);
adminRouter.put('/UpdateExplore/:id', expolre.update);
adminRouter.get('/exploreGetByOne/:id', expolre.getByOne);
adminRouter.post('/deleteExplore', expolre.deleteExplore);
adminRouter.get('/ExploreList', expolre.ExploreList);

export default adminRouter;