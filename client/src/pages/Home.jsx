import ProductList from "../components/products/ProductList";
import Navbar from "../components/sticker/Navbar";

export default function Home() {
    return (
        <div>
            <div>
                <Navbar />
                <h1>Welcome To our magnificent shop</h1>
                <ProductList />
            </div>
        </div>
    );
}


