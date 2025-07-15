import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import FoodContext from '../context/Foodcontext';
import Contactform from './ContactForm/Contactform';

const Navbar = ({ setshowlogin }) => {
  const [underline, setunderline] = useState('');
  const { gettotalamount, token, settoken } = useContext(FoodContext);
  const [showcontact, setshowcontact] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    settoken('');
    navigate('/');
  };

  return (
    <>
      <div className='navbar'>
        <img src={assets.swaaad} className='logo' alt="logo" />

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setmenuOpen(!menuOpen)}></div>

        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <Link onClick={() => setunderline('home')} className={underline === 'home' ? 'active' : ''} to='/'>Home</Link>
          <Link onClick={() => setunderline('menu')} className={underline === 'menu' ? 'active' : ''} to='/menu'>Menu</Link>
          <Link onClick={() => setunderline('mobile-app')} className={underline === 'mobile-app' ? 'active' : ''} to='/Appdownload'>Mobile-App</Link>
          <li onClick={() => {
            if (!token) {
              setunderline('contact');
              alert('Please login first');
              setshowlogin(true);
            } else {
              setunderline('contact');
              setshowcontact(true);
            }
          }} className={underline === 'contact' ? 'active' : ''}>Contact</li>
        </ul>

        <div className='navbar-right'>
          <div className='navbar-search-icon'>
            <Link to='/cart'><img src={assets.basket_icon} alt="basket" /></Link>
            <div className={gettotalamount() === 0 ? '' : 'dot'}></div>
          </div>
          {!token ? (
            <button className='btn' onClick={() => setshowlogin(true)}>Sign in</button>
          ) : (
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="profile" />
              <ul className='nav-profile-dropdown'>
                <Link to='/myorders'>
                  <li>
                    <img src={assets.bag_icon} alt="orders" />
                    <span>Orders</span>
                  </li>
                </Link>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="logout" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {showcontact && <Contactform setshowcontact={setshowcontact} />}
    </>
  );
};

export default Navbar;
