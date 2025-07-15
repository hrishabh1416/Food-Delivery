import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {assets} from '../../../assets/assets'
import './Order.css'
const Orders = ({url}) => {
    const[orders,setorders]=useState([])
    const fetchallorders=async()=>{
        const response=await axios.get(url+'/api/order/list');
        if(response.data.success) {
            setorders(response.data.data);
            console.log(response.data.data)   
        }
        else {
            toast.error("Error");
            console.log(err);
        }
    }
    const statushandler=async(event,orderid)=>{
      const response=await axios.post(url+'/api/order/status',{
        orderid,
        status:event.target.value
      })
      if(response.data.success) {
        await fetchallorders();
      }
    }
    useEffect(()=>{
        fetchallorders();
    },[])
  return (
    <div className='order add'>
      <h3>Order</h3>
      <div className='order-list'>
        {orders.map((order,index)=>(
          <div className='order-item' key={index}>
            <img src={assets.parcel_icon}></img>
            <div>
              <p className='order-item-food'>
              {order.items.map((item,index)=>{
                if(index===order.items.length-1) {
                  return item.name+" x "+item.quantity
                }
                else {
                  return item.name+" x "+item.quantity+ ", "
                }
              })}
              </p>
              <p className='order-item-name'>{order.address.firstname+" "+order.address.lastname}</p>
                <div className='order-item-address'>
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statushandler(event,order._id)} value={order.status}>
              <option value='Food Processing'>Food processing</option>
              <option value='Out for Delivery'>Out for delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
