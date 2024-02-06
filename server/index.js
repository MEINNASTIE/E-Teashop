import express from "express";
import "dotenv/config";
import DBConnect from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
DBConnect();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json()); 
// app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server is up and running!");
});
