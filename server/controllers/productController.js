import Product from '../models/Product.js';


// GET ALL PRODUCTS
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    // res.json(products);
    res.send({ success: true, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// CREATE A PRODUCT
export async function createProduct(req, res) {
  if (req.file) req.body.image = req.file.path;

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    quantity: req.body.quantity,
    imageUrl: req.file ? req.file.path : null
  });

  try {
    const newProduct = await product.save();
    // check for added product
    console.log('Product added:', newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// UPDATE A PRODUCT
export async function updateProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product properties if they are provided in the request body
    ['name', 'description', 'price', 'imageUrl', 'quantity'].forEach((key) => {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key];
      }
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// DELETE A PRODUCT
export async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// SEPARATE CATEGORIES FROM PRODUCT
export async function getProductCategories(req, res) {
  try {
    const products = await Product.find();
    const categories = [...new Set(products.map(product => product.category))];
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET A SINGLE PRODUCT
export async function getProductById(req, res) {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


