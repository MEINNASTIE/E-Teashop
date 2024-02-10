import { useState, useEffect } from 'react';
import Navbar from '../sticker/Navbar';

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item._id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    return (
        <div className="cart-page">
            <Navbar />
            <h2>Shopping Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item._id}>
                        <span>{item.name} - ${item.price}</span>
                        <button onClick={() => removeFromCart(item._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}