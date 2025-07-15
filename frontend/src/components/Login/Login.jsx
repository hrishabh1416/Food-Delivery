import React, { useContext, useState } from 'react';
import {assets, food_list} from '../../assets/assets'
import FoodContext from '../../context/Foodcontext'
import axios from 'axios';
import './Login.css'
function Login({setshowlogin}) {
  const {url,settoken,setuserid}=useContext(FoodContext);
  const[currentstate,setcurrentstate]=useState("Sign Up")
  const[data,setdata]=useState({
    name:"",
    email:"",
    password:""
  })
  const onchangehandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setdata(data=>({...data,[name]:value}));
  }
  const onlogin=async(event)=>{
    event.preventDefault();
    let newurl=url;
    if(currentstate==='Login') {
      newurl+='/api/user/login'
    }
    else {
      newurl+='/api/user/register'
    }
    const response=await axios.post(newurl,data)
    if(response.data.success) {
      settoken(response.data.token);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("userId", response.data.userId); 
      setshowlogin(false);
    }
    else {
      alert(response.data.message);
    }
  }
  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={onlogin}>
        <div className='login-popup-title'>
          <h2>{currentstate}</h2>
          <img src={assets.cross_icon} onClick={()=>setshowlogin(false)}></img>
        </div>
        <div className='login-popup-inputs'>
          {currentstate==="Sign Up"? <input name='name' onChange={onchangehandler} value={data.name} type='text' placeholder='Your name' required></input>:<></>}
          <input type='text' placeholder='Your Email-id' name='email' onChange={onchangehandler} value={data.email} required></input>
          <input type='password' placeholder='enter password' required name='password' onChange={onchangehandler} value={data.password}></input>
        </div>
        <button className='btn' type='submit' onClick={onlogin}>{currentstate==="Sign Up"?"Create Account":"Login"}</button>
        <div className='login-popup-condition'>
          <input type='checkbox' required></input>
          <p>By Continue,I agree to all terms and Services and adhere by to all privacy policy</p>
        </div>
        {currentstate==="Login"? <p>Create a new account?<span onClick={()=>setcurrentstate("Sign Up")}>Click here</span></p>:<p>Already have an account?<span onClick={()=>setcurrentstate("Login")}>Login here</span></p>}
      </form>
    </div>
  );
}

export default Login;
