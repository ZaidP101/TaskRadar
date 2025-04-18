import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './login.jsx'
import Signin from './signin.jsx'
import axiox from 'axios'
// require('dotenv').config();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Login /> */}
    <Signin/>
  </StrictMode>  
)
