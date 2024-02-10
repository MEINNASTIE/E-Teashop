import ReactDOM from 'react-dom/client'
import Routes from './Routes.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/userProvider.jsx'
import { ProductProvider } from './context/productProvider.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <UserProvider> 
        <ProductProvider> 
          <Routes />
        </ProductProvider> 
      </UserProvider>
    </BrowserRouter>
)
