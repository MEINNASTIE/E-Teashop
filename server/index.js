import express from "express";
import "dotenv/config";
import DBConnect from "./config/db.js";
import cors from "cors";
import dotenv from 'dotenv';

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import searchRoutes from "./routes/searchRoutes.js";
import wishRoutes from "./routes/wishRoutes.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

dotenv.config();

const app = express();
DBConnect();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json()); 
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/admin", productRoutes);
app.use("/api", searchRoutes)
app.use("/wish", wishRoutes)

// A very specific setup for email verification

// Set the views directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to use EJS
app.set('view engine', 'ejs');

app.get('/verification-success', (req, res) => {
  res.render('verification-success'); 
});

app.listen(5000, () => {
  console.log("Server is up and running!");
});
