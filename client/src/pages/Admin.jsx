import AddProduct from "../components/products/AddProduct.jsx";
import Navbar from "../components/sticker/Navbar.jsx"
import AdminProductList from "../components/products/AdminProductList.jsx"

export default function AdminDashboard() {
   
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="w-1/4 bg-gray-100 p-4" id="sidebar">
          <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
          <AddProduct />
        </div>
        
        <div className="w-full p-2">
          <AdminProductList />
        </div>
      </div>
    </>
  );
}

