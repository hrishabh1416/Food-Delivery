import './App.css';
import { BrowserRouter,Route,Routes,useLocation } from 'react-router-dom';
import Navbar from './components/navbar'
import Home from './components/pages/Home/Home.jsx';
import FoodContextProvider from './context/Foodcontextprovider.jsx';
import Footer from './components/Footer/footer';
import Login from './components/Login/Login';
import { useState } from 'react';
import Cart from './components/pages/Cart/Cart';
import PlaceOrder from './components/pages/Placeorder/Placeorder'
import Verify from './components/pages/Verify/verify';
import Myorders from './components/pages/MyOrders/Myorders';
import Appdownload from './components/Appdownload/Appdownload';
import Menu from './components/pages/Menu/Menu';
function AllContent() {
  return (
      <div>
        <Home/>
        <Footer/>
      </div>
  )
}
function MainApp() {
  const location=useLocation();
  const [showlogin,setshowlogin]=useState(false); 

  return (
  <>   
     <Navbar setshowlogin={setshowlogin}/>
        {showlogin?<Login setshowlogin={setshowlogin}/>:<></>}
    <div className='app'>
    {location.pathname==="/" && <Home/>}
    <Routes>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/order' element={<PlaceOrder/>}></Route>
      <Route path='/verify' element={<Verify/>}></Route>
      <Route path='/myorders' element={<Myorders/>}></Route>
      <Route path='/Appdownload' element={<Appdownload/>}></Route>
      <Route path='/menu' element={<Menu/>}></Route>
    </Routes>
    </div>
    <Footer/>
  </>
  );
}
function App() {
  return (
    <BrowserRouter>
    <FoodContextProvider>
    <MainApp/>
    </FoodContextProvider>
    </BrowserRouter>
  );
}
export default App;