import { useState } from 'react';

import ProductList from "../components/products/ProductList";
import Accordion from "../components/sticker/AccordionFilter";
import Navbar from "../components/sticker/Navbar";
import Footer from '../components/sticker/Footer';
import ShoppingInfo from '../components/sticker/ShoppingInfo';

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
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-[#E15438] w-full h-10 flex gap-2 justify-center items-center">
        <p className="text-white text-center">新年快乐</p> 
        <img src="/assets/coin.png" alt="gold" className="w-6"></img> 
        <p className="text-white text-center">Happy Lunar New Year of the Dragon!</p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mr-4 mb-4 ml-4 mt-4">
          <div className="bg-white shadow-s p-4">
            <div className="p-4">
              <p>店</p>
              <h2 className="text-lg font-semibold mb-4">Shop</h2>
              <p className="text-gray-600">More than “farm-to-table”, we believe in “people-to-people”—at Teapunktur. Commerce can be more about the transaction of goods, it can be a form of communication, conveying the passion of the producers and the appreciation of customers.</p>
            </div>
            <Accordion title="Tea types" onSelectCategory={handleSelectCategory} />
          </div>
        </div>
        <div className="md:flex-1">
          <ProductList selectedCategories={selectedCategories} />
        </div>
      </div>
      <ShoppingInfo />
      <Footer />
      <img src="/assets/tea_drawing.png" alt="tea_drawing" className="absolute top-[50%] w-[600px] z-[-10]"></img>
    </div>
  );
}


