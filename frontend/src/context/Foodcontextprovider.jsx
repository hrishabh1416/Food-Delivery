import React, { useEffect, useState } from 'react';
import FoodContext from './Foodcontext';
import { food_list } from '../assets/assets';
import axios from 'axios';
function Foodcontextprovider({children}) {
  const[fooditem,setfooditem]=useState([]);
  const[cartitems,setcartitems]=useState({});
  const [token,settoken]=useState("");
  const [userId, setUserId] = useState("");
  const url='https://food-delivery-backend-g9n4.onrender.com'
  const addtocart= async (itemid)=>{
    itemid = itemid.toString();
    if(!cartitems[itemid]) {
      setcartitems((prev)=>({...prev,[itemid]:1}));
    }
    else {
      setcartitems((prev)=>({...prev,[itemid]:prev[itemid]+1}));
    }
    if(token&&userId) {
      await axios.post(url+'/api/cart/add',{itemid,userid:userId},{headers:{token},});
    }
  }
  const removefromcart = async (itemid) => {
    itemid = itemid.toString();  
    setcartitems((prev) => {
      const updated = { ...prev };
      updated[itemid] = prev[itemid] - 1;
      if (updated[itemid] === 0) {
        delete updated[itemid];
      }
      return updated;
    });
  
    if (token && userId) {
      await axios.post(url + '/api/cart/remove', { itemid, userid: userId }, {
        headers: { token }
      });
    }
  };
  
  const gettotalamount=()=>{
    let totalamount=0;
    for(const item in cartitems) {
      if(cartitems[item]>0) {
        let iteminfo=fooditem.find((product)=>product._id===item);
        if(iteminfo) {
        totalamount+=iteminfo.price*cartitems[item];
        }
      }
    }
    return totalamount;
  }
  const fetchfoodlist=async()=>{
    const response=await axios.get(url+'/api/food/list')
    setfooditem(response.data.data)
  }
  useEffect(()=>{
    async function loaddata() {
      await fetchfoodlist();
      if(localStorage.getItem("token")) {
        settoken(localStorage.getItem("token"));
      }
      if(localStorage.getItem("cartitems")) {
        setcartitems(JSON.parse(localStorage.getItem("cartitems")));
      }
      if(localStorage.getItem("userId")) {
        setUserId(localStorage.getItem("userId"));
      }
    }
    loaddata();
  },[])
  useEffect(() => {
    localStorage.setItem("cartitems", JSON.stringify(cartitems));
  }, [cartitems]);
  return (
    <div> 
      <FoodContext.Provider value={{fooditem,setfooditem,cartitems,setcartitems,addtocart,removefromcart,gettotalamount,url,token,settoken,userId,setUserId}}>
        {children}
      </FoodContext.Provider>
    </div>
  );
}

export default Foodcontextprovider;
