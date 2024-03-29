import { useState } from 'react';
import useFetchProducts from '../../hooks/useFetchProducts.js';
import Product from './Product';

export default function ProductList({ selectedCategories }) {
    const [searchQuery, setSearchQuery] = useState('');
    const products = useFetchProducts();
    const [cartItems, setCartItems] = useState([]);

    const [total, setTotal] = useState(0);

    // this function was HELL to think of, create and connect haha 
    const filteredProducts = products.filter(product => {
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false; 
        }
        if (searchQuery.trim() !== '') {
            const regex = new RegExp(searchQuery, 'i');
            return regex.test(product.name) || regex.test(product.description) || regex.test(product.category);
        }
        return true;
    });
    ///////////////////////////////////////////////////////////////////////////////////

    const productChunks = [];
    for (let i = 0; i < filteredProducts.length; i += 8) {
        productChunks.push(filteredProducts.slice(i, i + 8));
    }

    const addToCart = (product) => {
        // a unique way to solve product key uniqueness when storing in local storage / can be also done with a library uuidv4

        const uniqueProductId = `${product._id}-${Date.now()}`; 
        const uniqueProduct = { ...product, cartItemId: uniqueProductId }; // Add a unique key to the product
        setCartItems([...cartItems, uniqueProduct]);
        const updatedCart = [...cartItems, uniqueProduct];
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const handleLoadMore = async () => {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL +
            `/auth/get/all?&skip=${products.length}`
        );
        console.log("🚀 ~ response:", response);
    
        if (response.data.success) {
        //   setUsers((prev) => [...prev, ...response.data.users]);
          setTotal(response.data.total);
        }
      };

    return (
        <div className="container mx-auto min-h-screen"> 
            <p className="text-[20px] text-gray-700 font-bold my-8 ml-12 mr-10">Offering the world's most compact selection of Chinese tea, Teapunktur bridges linguistic & cultural barriers that separate Chinese tea farmers and tea enthusiasts worldwide.</p>
            
            <h2 className="text-[36px] ml-12">Explore</h2>
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 m-4 ml-12"
            />
            <div className="m-10">
                {productChunks.map((chunk, index) => (
                    <div key={index} className="grid grid-cols-4 gap-6">
                        {chunk.map(product => (
                            <Product
                                key={product._id}
                                product={product}
                                addToCart={addToCart}  
                            />
                        ))}
                    </div>
                ))}
            </div>
            {products.length < total && (
             <button onClick={handleLoadMore}>Load more</button>
            )}
        </div>
    );
}



