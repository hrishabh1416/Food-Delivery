  import React, { useContext,useEffect} from 'react';
  import Foodcontext from '../../../context/Foodcontext';
  import './Cart.css'
  import { useNavigate } from 'react-router-dom';
  function Cart() {
    const{cartitems,fooditem,addtocart,removefromcart,gettotalamount,url}=useContext(Foodcontext);
    const navigate=useNavigate();
    useEffect(() => {
      console.log("Cart Items Updated in Cart.jsx:", cartitems);
    }, [cartitems]);
    if (!fooditem.length) return <div>Loading your cart...</div>;
    return (
      <>
      <div className='cart '>
        <div className='cart-items'>
          <div className='cart-items-title'>
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br/>
          <hr/>
          {fooditem.map((item)=>{
            if(cartitems[item._id] && cartitems[item._id]>0) {
              return (
                <div key={item._id}>
                <div className='cart-items-title cart-items-item' key={item._id}>
                  <img src={url+'/images/'+item.image}></img>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartitems[item._id]}</p>
                  <p>{item.price*cartitems[item._id]}</p>
                  <button className='cross' onClick={()=>removefromcart(item._id)}>X</button>
                </div>
                <hr />
                </div>
              );
            }
          })}
        </div>
        <div className='cart-bottom'>
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
              <button onClick={()=>navigate('/order')}> Prcoeed To checkout</button>
          </div>
        </div>
      </div>
      </>
    );
  }

  export default Cart;
