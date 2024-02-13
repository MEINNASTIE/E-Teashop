import mongoose from "mongoose";

import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number, 
    required: true,
    default: 1 
  },
  category: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  quantity: {
    type: Number, 
    required: true,
    default: 1    // add for each product in admin the quantity 
  },
}, {
  timestamps: true 
});

const Product = model('Product', productSchema);

export default Product;
