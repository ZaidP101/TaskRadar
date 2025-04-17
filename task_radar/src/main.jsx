import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './client/login.jsx'
import Signin from './client/signin.jsx'
// require('dotenv').config();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Login /> */}
    <Signin/>
  </StrictMode>
)
