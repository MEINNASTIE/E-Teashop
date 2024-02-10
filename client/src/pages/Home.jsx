import { useState } from 'react';

import ProductList from "../components/products/ProductList";
import Accordion from "../components/sticker/AccordionFilter";
import Navbar from "../components/sticker/Navbar";

export default function Home() {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSelectCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div>
            <div>
                <Navbar />
                <h1>Welcome To our magnificent shop</h1>
                <Accordion title="Tea types" onSelectCategory={handleSelectCategory} />
                <ProductList selectedCategories={selectedCategories} />
            </div>
        </div>
    );
}


