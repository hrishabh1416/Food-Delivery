import React, { useEffect } from 'react'
import './verify.css'
import {useSearchParams} from 'react-router-dom'
import { useContext } from 'react';
import FoodContext from '../../../context/Foodcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Verify = () => {
    const[searchparams,setsearchparams]=useSearchParams();
    const success=searchparams.get("success");
    const orderid=searchparams.get("orderid");
    const {url}=useContext(FoodContext)
    const navigate=useNavigate()
    console.log(success,orderid)
    const verifypayment=async()=>{
        const response=await axios.post(url+'/api/order/verify',{success,orderid});
        if(response.data.success) {
            navigate('/myorders')
        }
        else {
            navigate('/')
        }
    }
    useEffect(()=>{
        verifypayment();
    },[])
  return (
    <div className='verify'>
        <div className='spinner'>

        </div>
    </div>
  )
}

export default Verify;
