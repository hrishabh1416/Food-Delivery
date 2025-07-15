import React, { useContext, useState } from 'react';
import {assets} from '../../assets/assets.js'
import FoodContext from '../../context/Foodcontext.js';
import "./Fooditem.css"
function Fooditem({id,name,price,description,image}) {  
  const[itemcount,setitemcount]=useState(0);
  const{cartitems,addtocart,removefromcart,url}=useContext(FoodContext)
  function increasecount() {
    setitemcount((prev)=>prev+1);
  }
  function decreasecount(prev) {
    setitemcount((prev)=> prev>0?prev-1:0);
  }
  return (
    <div className='food-item'> 
    <div className='food-item-img-container'>
      <img className='food-item-image' src={url+'/images/'+image}/>
        {!cartitems[id]
        ?
        <img src={assets.add_icon_white} onClick={()=>addtocart(id)} className='add'></img>
        :
        <div className='food-item-counter'>
          <img src={assets.remove_icon_red} onClick={()=>removefromcart(id)} className='increase' style={{cursor:'pointer'}}></img>
          <p>{cartitems[id]}</p>
          <img src={assets.add_icon_green} onClick={()=>addtocart(id)} className='decrease'  style={{cursor:'pointer'}}></img>
        </div>
        }
    </div>
    <div className='food-item-info'>
      <div className='food-item-name-rating'>
        <p>{name}</p>
        <img src={assets.rating_starts}/>
      </div>
      <p className='food-item-desc'>{description}</p>
      <br></br>
      <p className='food-item-price'>₹{price}</p>
    </div>
    </div>
  );
}

export default Fooditem;
