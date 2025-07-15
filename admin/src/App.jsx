import './App.css'
import { BrowserRouter,Route,Routes,useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './components/pages/Add/Add'
import List from './components/pages/List/List'
import Order from './components/pages/Order/Order'
import { ToastContainer} from 'react-toastify';
function AllContent() {
  const url='https://food-delivery-backend-g9n4.onrender.com';
  return (
    <div>
      <Navbar/>
      <hr/>
      <div className='app-content'>
      <Sidebar/>
      </div>
    </div>
  )
}
function MainApp() {
  const url='https://food-delivery-backend-g9n4.onrender.com';
  const location=useLocation();


  return (
    <div>   
       {location.pathname==="/" && <AllContent/>}
      <Routes>
        <Route path='/add' element={<Add url={url}/>}></Route>
        <Route path='/list' element={<List url={url}/>}></Route>
        <Route path='/orders' element={<Order url={url}/>}></Route>
      </Routes>
    </div>
    );
  }
  function App() {
    const url='https://food-delivery-backend-g9n4.onrender.com';
    return (
      <BrowserRouter>
      <ToastContainer/>
      <MainApp/>
      </BrowserRouter>
    )
  }
export default App;
