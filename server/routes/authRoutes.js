import express from "express";
import {
  handleRegister,
  handleLogin,
  handleVerification
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/verify/:token", handleVerification);


export default router;