import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import PageNotFound from "./pages/PageNotFound";
import CartPage from "./components/cart/CartMain";
import ProductDisplay from "./pages/ProductDisplay";
import UserProfile from "./components/user/UserProfile";
import ShippingForm from "./pages/ShoppingForm";
import VerificationPage from "./pages/VerficationPage";

export default function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:productId" element={<ProductDisplay />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/payment" element={<ShippingForm />} />

      <Route path="/verify/:token" element={<VerificationPage />} />

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
     </Routes>
    </>
  )
}
