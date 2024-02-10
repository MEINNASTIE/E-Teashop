import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import PageNotFound from "./pages/PageNotFound";
import CartPage from "./components/cart/CartMain";

export default function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cart" element={<CartPage />} />

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
     </Routes>
    </>
  )
}
