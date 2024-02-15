import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const handleRegister = async (req, res) => {
  try {
    console.log("~ Register:", req.body);

    const SALT_ROUNDS = 10;

    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    console.log("~ hash:", hash);
    req.body.password = hash;

    const verificationToken = crypto.randomBytes(20).toString('hex'); 

    console.log("~ Verification Token:", verificationToken);

    const user = await User.create({ 
      ...req.body, 
      verificationToken: verificationToken 
    }); 
    console.log("~ user:", user);

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "fbb3ea5c403012",
        pass: "3f615e05471608"
      }
    });

    const mailOptions = {
      from: '"Tyhe" <tyhe444@gmail.com>', 
      to: user.email,
      subject: 'Email Verification',
      text: "Please verify your email",
      html: `
       <h3>Welcome to TEAPUNKTUR</h3>
       <p>To verify your email please click on the following link:</p>
       <a href="http://localhost:5173/verify/${verificationToken}">verify my email</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, error: 'Failed to send verification email' });
      } else {
        console.log('Email sent: ' + info.response);
        console.log('Verification email has been sent to: ' + user.email); 
        res.status(201).send({ success: true, user });
      }
    });
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

export const handleVerification = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("~ Verification Token received:", token); 

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      console.log("~ No user found with this verification token."); 
      return res.status(404).send({ success: false, error: 'Invalid verification token' });
    }

    user.verified = true;
    await user.save();

    console.log("~ User verified:", user.email); 
    res.redirect('/auth/login'); 
  } catch (error) {
    console.log("~ error in verification:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
};
