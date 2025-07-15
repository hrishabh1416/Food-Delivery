import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className='header'>
      <div className='header-content'>
        <h2>Order your Favourite <br></br>Food here</h2>
        <p>
          Choose from a diverse menu<br></br> featuring a  array of dishes crafted <br />with finest 
          ingredients to satisfy <br /> your cravings and elevate  <br />your
          dining experience  <br />with one meal at a taime
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
// import React from 'react';
// import './Header.css';
// import {assets} from '../../assets/assets'
// function Header() {
//   return (
//     <div className='header'>
//       <div className='header-content'>
//         <h2>Order your Favourite Food here</h2>
//         <p>
//           Choose from a diverse menu featuring a array of dishes<br></br> crafted with finest <br />
//           ingredients to satisfy your cravings and elevate your <br />
//           dining experience with one meal at a taime
//         </p>
//         <button>View Menu</button>
//       </div>
//       <div className='header-image'>
//         <img src={assets.header1}></img>
//       </div>
//     </div>
//   );
// }

// export default Header;



