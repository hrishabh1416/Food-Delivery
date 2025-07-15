import { createRoot } from 'react-dom/client'
import {React} from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import Foodcontextprovider from './context/Foodcontextprovider';
createRoot(document.getElementById('root')).render(
  <Foodcontextprovider>
    <App/>
  </Foodcontextprovider>
)
