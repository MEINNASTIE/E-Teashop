import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/userProvider.jsx'
import { AuthProvider } from './components/auth/AuthLoginContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
