import orderModel from '../models/ordermodel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'
const stripe=new  Stripe(process.env.STRIPE_SECRET_KEY)
const placeOrder=async(req,res)=>{
     const frontend_url='https://food-delivery-lgwo.onrender.com';
    try{
        const neworder=new orderModel({
            userid:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        });
        await neworder.save();
        await userModel.findByIdAndUpdate(req.body.userid,{cartData:{}}); 

        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:'inr',
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:'inr',
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:20*100
            },
            quantity:1
        })
        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderid=${neworder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderid=${neworder._id}`
        })
        res.json({success:true,session_url:session.url})
    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const verifyorder=async(req,res)=>{
    const{orderid,success}=req.body;
        try{
            if(success=="true") {
                 await orderModel.findByIdAndUpdate(orderid,{payment:true});
                 res.json({success:true,message:"Paid"})
            }
            else {
                await orderModel.findByIdAndDelete(orderid);
                res.json({success:false,message:"Not paid"})
            }
        }
        catch(error) {
            console.log(error);
            res.json({success:false,message:"Error"})
        }
}
const userorders=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
const listorder=async(req,res)=>{
    try{
        const orders=await orderModel.find({});
        res.json({success:true,data:orders})
}
catch(error) {
    console.log(error);
    res.json({success:false,message:"Error"});
}
}
const updatestatus=async(req,res)=>{
    try{ 
        await orderModel.findByIdAndUpdate(req.body.orderid,{status:req.body.status});
        res.json({success:true,message:"Status updated"})
    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        await orderModel.findByIdAndDelete(orderId);
        res.json({ success: true, message: "Order cancelled successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to cancel order" });
    }
};
export {placeOrder,verifyorder,userorders,listorder,updatestatus,cancelOrder}
