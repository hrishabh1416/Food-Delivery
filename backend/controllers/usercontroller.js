import userModel from'../models/userModel.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const loginUser=async(req,res)=> {
    const{email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user) {
            res.json({success:false,message:"User not exist"})
        }
        const ismmatch=await bcrypt.compare(password,user.password);

        if(!ismmatch) {
            res.json({success:false,message:"Please enter correct password or id"})
        }
        const token=createtoken(user._id);
        res.json({ success: true, token, userId: user._id });
    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const createtoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const registerUser=async(req,res)=>{
    const{name,email,password}=req.body;
    try{
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exist"});
        }
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter valid email"})
        }
        if(password.length<8) {
            return res.json({success:false,message:"Please choose a strong password"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);

        const newuser=new userModel({
            name:name,
            email:email,
            password:hashedpassword
        })
        const user=await newuser.save();
        const token=createtoken(user._id);
        res.json({ success: true, token, userId: user._id });

    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export {loginUser,registerUser};