import AddProduct from "../components/products/AddProduct.jsx";
import Navbar from "../components/sticker/Navbar.jsx"
import AdminProductList from "../components/products/AdminProductList.jsx"

export default function AdminDashboard() {
   
  return (
    <>
    <Navbar />
    <div>
      <h2>Admin Dashboard</h2>
      <AddProduct />
      <AdminProductList />
    </div>
    </>
  );
}

