import useFetchProducts from '../../hooks/useFetchProducts.js';
import Product from './Product';

export default function ProductList({ selectedCategories }) {
    const products = useFetchProducts();

    const filteredProducts = selectedCategories.length > 0
        ? products.filter(product => selectedCategories.includes(product.category))
        : products;

    const productChunks = [];
    for (let i = 0; i < filteredProducts.length; i += 8) {
        productChunks.push(filteredProducts.slice(i, i + 8));
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold my-8">All Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {productChunks.map((chunk, index) => (
                    <div key={index} className="grid grid-cols-1 gap-6">
                        {chunk.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}



