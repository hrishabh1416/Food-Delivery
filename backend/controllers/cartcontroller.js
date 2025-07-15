import userModel from '../models/userModel.js'
const addtocart=async(req,res)=>{
    try{
        let userdata=await userModel.findById(req.body.userid); 
        let cartData=await userdata.cartData;
        if(!cartData[req.body.itemid]) {
            cartData[req.body.itemid]=1;   
        }
        else {
            cartData[req.body.itemid]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userid,{cartData});
        res.json({success:true,message:"Add to cart"})
    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}
const removefromcart=async(req,res)=>{
    try{
        let userdata=await userModel.findById(req.body.userid);
        let cartData=await userdata.cartData;
        if(cartData[req.body.itemid]>0) {
            cartData[req.body.itemid]-=1;
            if (cartData[req.body.itemid] === 0) {
                delete cartData[req.body.itemid]; 
              }
        }
        await userModel.findByIdAndUpdate(req.body.userid,{cartData});
        res.json({success:true,message:"Removed from cart"})
    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const getcart=async(req,res)=>{
    try{
        let userdata=await userModel.findById(req.body.userid);
        let cartData=await userdata.cartData;
        res.json({success:true,data:cartData})
    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export {addtocart,removefromcart,getcart};