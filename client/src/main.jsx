import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/userProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>   
          <Routes />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
