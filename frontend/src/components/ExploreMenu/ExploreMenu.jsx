import React from 'react';
import { menu_list } from '../../assets/assets';
import "./Exploremenu.css"
function ExploreMenu({category,setcategory}) {
  return (
    <div className='explore-menu-outer'>
    <div className='explore-menu'>
      <h1>Explore Our menu</h1>
      <p className='explore-menu-text'> From cozy meals that feel like home to bold bites<br></br> that awaken your senses — our menu brings together<br></br> everything you love about food, all in one delicious place.</p>
    <div className='explore-menu-list-wrapper'>
    <div className='explore-menu-list'>
      {menu_list.map((item,index)=>{
        return (
          <div key={index} className={'explore-menu-list-item'} onClick={()=>setcategory((prev)=>(prev===item.menu_name?"All":item.menu_name))}>
            <img src={item.menu_image} className={category===item.menu_name?"active1":""} id='im1'></img>
            <p>{item.menu_name}</p>
          </div>
        )
      })}
    </div>
    </div>
    <hr></hr>
    </div>
    </div>
  );
}

export default ExploreMenu;

