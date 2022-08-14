import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isNameUsed = await User.findOne({ username });
    const isEmailUsed = await User.findOne({ email });

    if (isNameUsed) {
      return res.status(403).json({
        message: "Username is allready used",
      });
    }

    if (isEmailUsed) {
      return res.status(403).json({
        message: "This email is allready used",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const { password: passwordHash, ...userData } = newUser._doc;

    res.status(200).json({
      ...userData,
      token,
      message: "User created",
    });
  } catch (e) {
    res.status(403).json({
      message: "Error while creating user",
    });
  }
};

// login user

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordConrrect = await bcrypt.compare(password, user.password);

    if (!isPasswordConrrect) {
      return res.status(403).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const { password: passwordHash, ...userData } = user._doc;

    res.status(200).json({
      ...userData,
      token,
      message: "Logged in",
    });
  } catch (e) {
    console.log(e);
    res.status(403).json({
      message: "Error while login",
    });
  }
};

// get user

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const { password: passwordHash, ...userData } = user._doc;

    res.status(200).json(userData);
  } catch (e) {
    res.status(403).json({
      message: "Access denied",
    });
  }
};
