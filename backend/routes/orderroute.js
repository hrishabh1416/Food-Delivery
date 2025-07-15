import express from 'express'
import authmiddleware from '../middleware/auth.js'
import { listorder, placeOrder, updatestatus, userorders, verifyorder,cancelOrder } from '../controllers/ordercontroller.js'
const orderRouter=express.Router();
orderRouter.post('/place',authmiddleware,placeOrder);
orderRouter.post('/verify',verifyorder);
orderRouter.post('/userorders',authmiddleware,userorders);
orderRouter.get('/list',listorder);
orderRouter.post('/status',updatestatus)
orderRouter.post('/cancelorder', cancelOrder);
export default orderRouter; 