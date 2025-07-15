import React, { useContext, useEffect,useState } from 'react'
import './Myorders.css'
import FoodContext from '../../../context/Foodcontext';
import axios from 'axios'
import {assets} from '../../../assets/assets';
const Myorders = () => {
    const[data,setdata]=useState([]);
    const {url,token}=useContext(FoodContext);
    const cancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        
        try {
            const response = await axios.post(url + "/api/order/cancelorder", { orderId }, {
                headers: { token }
            });
            if (response.data.success) {
                setdata(prev => prev.filter(order => order._id !== orderId)); // Remove from UI
            } else {
                alert("Failed to cancel order");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };
    const fetchorders=async()=>{
        const response= await axios.post(url+'/api/order/userorders',{},{headers:{token}});
        setdata(response.data.data);
    }
    useEffect(()=>{
        if(token) {
            fetchorders();
        }
    },[token])
  return (
    <div className='my-orders'>  
    <h2>My orders</h2>
     <div className='container'>
        {data.map((order,index)=>{
            return (
                <div className='my-orders-order' key={index}>
                        <img src={assets.parcel_icon}></img>
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1) {
                                return item.name+" x "+item.quantity;
                            }
                            else {
                                return item.name+" x "+item.quantity+ ", "
                            }

                        })}</p>
                        <p>₹{order.amount}</p>
                        <p>Items:{order.items.length}</p>
                        <p> <span>&#x25cf;</span><b>{order.status}</b></p>
                        <div className="order-actions">
                            <button>Track Order</button>
                            <button className='cancel-btn' onClick={() => cancelOrder(order._id)}>Cancel Order</button>
                            </div>
                </div>  
            )
        })}
     </div>
    </div>
  )
}

export default Myorders
