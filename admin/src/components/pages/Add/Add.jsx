import React, { useState } from 'react';
import './Add.css'
import {assets} from '../../../assets/assets'
import axios from 'axios';  
import { toast } from 'react-toastify';
function Add({url}) {
  const[image,setimage]=useState(false);
  const[data,setdata]=useState({
    name:"",
    description:"",
    price:"",
    category:"Beverages"
  })
  const onchangehandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setdata(data=>({...data,[name]:value}))
  }
  const onsubmithandler=async (event)=>{
    event.preventDefault();
    const formdata=new FormData();
    formdata.append('name',data.name);
    formdata.append('description',data.description);
    formdata.append('price',Number(data.price));
    formdata.append('category',data.category);
    formdata.append('image',image);
    const response=await axios.post(`${url}/api/food/add`,formdata);
    if(response.data.success) {
      setdata({
        name:"",
        description:"",
        price:"",
        category:"Beverages"
      })
      setimage(false)
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }
  }
  return (
    <div className='add'>
      <form className='flex-col'>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'> <img src={image?URL.createObjectURL(image):assets.upload_area}></img></label>
          <input  onChange={(event)=>setimage(event.target.files[0])} type='file' id='image' hidden required></input>
        </div>
        <div  className='add-product-name flex-col'>
          <p>Product name</p>
          <input type='text' name='name' placeholder='Type here' onChange={onchangehandler} value={data.name} required></input>
        </div>
        <div className='add-product-description-flex-col'>
          <p>Product description</p>
          <textarea name="description" rows='10' placeholder='Write description of the product' onChange={onchangehandler} value={data.description} required></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-category-flex-col'>
            <p>Product category</p>
            <select name='category'onChange={onchangehandler} value={data.category}  required> 
            <option value='Beverages'>Beverages</option>
            <option value='Bread'>Bread</option>
            <option value='Deserts'>Deserts</option>
            <option value='Thali'>Thali</option>
            <option value='Cake'>Cake</option>
            <option value='Main Course'>Main Course</option>
            <option value='Chinese'>Chinese</option>
            <option value='Quick Meals'>Quick Meals</option>
            </select>
          </div>
          <div className='add-price flex-col'>
              <p>Product Price</p>
              <input type='number' name='price' placeholder='₹20' onChange={onchangehandler} value={data.price} required></input>
          </div>
        </div>
        <button type='submit' className='add-btn' onClick={onsubmithandler} required>Add </button>
      </form>
    </div>
  );
}

export default Add;
