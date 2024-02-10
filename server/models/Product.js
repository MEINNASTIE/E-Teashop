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
    type: String,
    required: true
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
}, {
  timestamps: true 
});

const Product = model('Product', productSchema);

export default Product;
