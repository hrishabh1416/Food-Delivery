import React, { useState } from 'react';
import Header from '../../Header/Header.jsx';
import ExploreMenu from '../../Exploremenu/ExploreMenu.jsx';
import FoodList from '../../FoodList/FoodList.jsx';
import Appdownload from '../../Appdownload/Appdownload.jsx';
import './Home.css'
function Home() {
  const [category,setcategory]=useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setcategory={setcategory}/>
      <FoodList category={category}/>
      <Appdownload/>
    </div>
  );
}

export default Home;
