import React from 'react';
import {assets} from '../../assets/assets'
import './footer.css'
function Footer() {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
        <img src={assets.swaaad} className='foooter'></img>
          <p>Discover a world of flavor with our food-ordering website, where every dish is crafted to perfection. From spicy Indian curries to cheesy Italian pastas, we offer a wide variety of freshly prepared food items to satisfy every craving. Each meal is made with high-quality ingredients, ensuring rich taste, aroma, and hygiene. Our intuitive interface makes browsing and ordering quick and seamless. With real-time order tracking and prompt delivery, your favorite food is just a click away. Enjoy restaurant-quality meals in the comfort of your home!</p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon}></img>
            <img src={assets.linkedin_icon}></img>
            <img src={assets.twitter_icon}></img>
          </div>
        </div>
        <div className='footer-content-center'>
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>GET IN TOUCH </h2>
          <ul>
            <li>+8989-4667-7290</li>
            <li>swaad@yourshop.in</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'> Copyright 2025 @swaad.com-All Right reserved</p>
    </div>
  );
}

export default Footer;
