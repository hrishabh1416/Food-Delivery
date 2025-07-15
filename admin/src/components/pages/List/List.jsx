import React, { useState ,useEffect} from 'react';
import './List.css'
import {toast} from 'react-toastify';
import axios from 'axios';
function List({url}) {
  const[list,setlist]=useState([]);
  const fetchlist=async()=>{
    const response= await axios.get(`${url}/api/food/list`);
    if(response.data.success) {
      setlist(response.data.data);
    }
    else {
      toast.error('Error');
    }
  }
  const removeFood = async (foodid) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodid });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchlist(); // Refresh list only after success
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Failed to remove item");
    }
  };
  
  useEffect(() => {
    fetchlist();
  }, []);
  return (
    <div className='list add flex-col'>
      <p>All foods list</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image}></img>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={() => removeFood(item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default List;
