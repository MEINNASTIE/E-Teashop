import { useState } from 'react';
import useFetchProducts from '../../hooks/useFetchProducts.js';
import Product from './Product';

export default function ProductList({ selectedCategories }) {
    const products = useFetchProducts();
    const [cartItems, setCartItems] = useState([]);

    const filteredProducts = selectedCategories.length > 0
        ? products.filter(product => selectedCategories.includes(product.category))
        : products;

    const productChunks = [];
    for (let i = 0; i < filteredProducts.length; i += 8) {
        productChunks.push(filteredProducts.slice(i, i + 8));
    }

    const addToCart = (product) => {
        // a unique way to solve product key uniqueness when storing in local storage / can be also done with a library uuidv4

        const uniqueProductId = `${product._id}-${Date.now()}`; 
        const uniqueProduct = { ...product, cartItemId: uniqueProductId }; // Add a unique key to the product
        setCartItems([...cartItems, uniqueProduct]);
        // Update localStorage
        const updatedCart = [...cartItems, uniqueProduct];
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold my-8">All Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {productChunks.map((chunk, index) => (
                    <div key={index} className="grid grid-cols-1 gap-6">
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
        </div>
    );
}



