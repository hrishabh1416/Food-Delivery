import React from 'react';
import {assets} from '../../assets/assets'
import {Link} from 'react-router-dom'
import './Sidebar.css'
function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <div className='sidebar-option'>
          <img src={assets.add_icon}></img>
          <Link to='/add'>Add items</Link>
        </div>
        <div className='sidebar-option'>
          <img src={assets.order_icon}></img>
          <Link to='/list'>List items</Link>
        </div>
        <div className='sidebar-option'>
          <img src={assets.order_icon}></img>
          <Link to='/orders'>Orders</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
