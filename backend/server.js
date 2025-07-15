import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import foodRouter from './routes/foodroute.js';
import userRouter from './routes/userroute.js';
import 'dotenv/config'
import cartrouter from './routes/cartroute.js';
import orderRouter from './routes/orderroute.js';
import dotenv from "dotenv";
dotenv.config();
const app=express();
const port=process.env.PORT||4000;
app.use(express.json());
// app.use(cors({
//   origin: ['https://food-delivery-website-4a6g.onrender.com'],
//   credentials: true
// }));
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174'],
  credentials: true
}));

connectDB();
app.use('/api/food',foodRouter)
app.use('/images', express.static('uploads'));
app.use('/api/user',userRouter);
app.use('/api/cart',cartrouter);
app.use('/api/order',orderRouter);
app.get('/',function(req,res) {
    res.send("API is working");
})
app.listen(port,function() {
    console.log(`Server started on port${port}`);
})
