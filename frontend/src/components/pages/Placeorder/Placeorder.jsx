import React, { useContext, useState } from 'react';
import FoodContext from '../../../context/Foodcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Placeorder.css'
function Placeorder() {
  const {gettotalamount,token,fooditem,cartitems,url}=useContext(FoodContext);
  const navigate=useNavigate();
  const [data,setdata]=useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })
  const onchangehandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setdata(data=>({...data,[name]:value}))
  }
  const placeorder=async(event)=>{
    event.preventDefault();
    let orderitems=[];
    fooditem.map((item)=>{
      if(cartitems[item._id]>0) {
        let iteminfo=item;
        iteminfo['quantity']=cartitems[item._id];
        orderitems.push(iteminfo);
      }
    })
    console.log(orderitems);
    let orderdata={
      address:data,
      items:orderitems,
      amount:gettotalamount()+2,
    }
    try {
      const response = await axios.post(url + '/api/order/place', orderdata, {
        headers: { token },
      });
  
      console.log("Backend Response:", response.data);
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.href = session_url; 
      } else {
        alert("Order placement failed: " + response.data.message || "Unknown error");
      }
    } catch (err) {
      console.error("Axios error:", err);
      alert("Something went wrong while placing the order.");
    }
}
  return (
    <form className='place-order' onSubmit={placeorder}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input type='text' placeholder='First name' name='firstname' onChange={onchangehandler} value={data.firstname} required></input>
          <input type='text' placeholder='Last name' name='lastname' onChange={onchangehandler} value={data.lastname} required></input>
        </div>
        <input type='email' placeholder='Email address' name='email' onChange={onchangehandler} value={data.email} required></input>
        <input type='text' placeholder='Street' name='street' onChange={onchangehandler} value={data.street} required></input>
        <div className='multi-fields'>
          <input type='text' placeholder='City' name='city' onChange={onchangehandler} value={data.city} required></input>
          <input type='text' placeholder='State' name='state' onChange={onchangehandler} value={data.state} required></input>
        </div>
        <div className='multi-fields'>
          <input type='text' placeholder='ZIP code' name='zipcode' onChange={onchangehandler} value={data.zipcode} required></input>
          <input type='text' placeholder='Country' name='country' onChange={onchangehandler} value={data.country} required></input>
        </div>
        <input type='number' placeholder='Phone' name='phone' onChange={onchangehandler} value={data.phone} required
        ></input>
      </div>
      <div className='place-order-right'>
      <div className='cart-total'>
          <h2>Card Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{gettotalamount()}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
            <p>Delivery Fee</p>
            <p>₹{20}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <b>Total</b>
              <b>₹{gettotalamount()+20}</b>
            </div>
            </div>
            <button type='submit' > Prcoeed To Payment</button>
        </div>
      </div>
    </form>
  );
}

export default Placeorder;
