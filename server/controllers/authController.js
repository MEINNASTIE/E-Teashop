import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleRegister = async (req, res) => {
  try {
    console.log("~ Register:", req.body);

    const SALT_ROUNDS = 10;

    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    console.log("~ hash:", hash);
    req.body.password = hash;

    const user = await User.create(req.body);
    console.log("~ user:", user);

    res.status(201).send({ success: true, user });
  } catch (error) {
    console.log("~ error in register:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
};

export const handleLogin = async (req, res) => {
  try {
    console.log("Login:", req.body);

    const user = await User.findOne({
      email: req.body.email,
    });
    console.log("user:", user);

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("isMatch:", isMatch);

    if (!user || !isMatch)
      return res.send({
        success: false,
        error: "Email or password not correct",
      });

    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20d",
    });
    console.log("token:", token);

    res.send({ success: true, user, token });
  } catch (error) {
    console.log("error in login:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
};