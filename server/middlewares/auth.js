import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🚀 ~ decoded:", decoded);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.log("🚀 ~ error in auth:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
}
