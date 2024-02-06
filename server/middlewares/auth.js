import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    
    const decoded = jwt.verify(
      process.env.JWT_SECRET
    );
    console.log("🚀 ~ decoded:", decoded);

    req.user = decoded.id;

    next();
  } catch (error) {
    console.log("🚀 ~ error in auth:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
}