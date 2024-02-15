import ReactDOM from 'react-dom/client'
import Routes from './Routes.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/userProvider.jsx'
import { ProductProvider } from './context/productProvider.jsx'
import { CartProvider } from './context/cartContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <UserProvider> 
        <ProductProvider> 
          <CartProvider>
            <Routes />
          </CartProvider>
        </ProductProvider> 
      </UserProvider>
    </BrowserRouter>
)
