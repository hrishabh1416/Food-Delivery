import React from 'react';
import {assets} from  '../../assets/assets'
import './Appdownload.css'
function Appdownload() {
  return (
    <div className='app-download' id='app-download'>
      <h3>For Better  Experience <br></br> Tomato App</h3>
      <div className='app-download-platforms'>
        <img src={assets.play_store}></img>
        <img src={assets.app_store}></img>
      </div>
    </div>
  );
}

export default Appdownload;
