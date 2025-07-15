import React from 'react';
import {assets} from '../../assets/assets'
import './Navbar.css'
function Navbar() {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo}></img>
      <img className='profile' src={assets.profile_image}></img>
    </div>
  );
}

export default Navbar;
