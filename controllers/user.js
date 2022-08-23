import User from "../models/User.js";
import Hotel from "../models/Hotel.js";
import { validationResult } from "express-validator";

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const result = await Promise.all(
      user.favorites.map((item) => {
        return Hotel.findById(item);
      })
    );

    return res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      message: "Server error",
    });
  }
};

export const reserveHotel = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    return res.status(200).json({ message: "Success" });
  } catch (e) {
    return res.status(401).json({ message: "Hotel reserve failed" });
  }
};

export const addToFavorites = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.body.id);

    if (!hotel) {
      return res.status(401).json({
        message: "Hotel not exist",
      });
    }

    const user = await User.findByIdAndUpdate(req.userId, {
      $addToSet: { favorites: hotel },
    });

    return res.status(200).json(user);
  } catch (e) {
    res.status(400).json({
      message: "Server error",
    });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, {
      $pull: { favorites: req.body.id },
    });

    return res.status(200).json(req.body.id);
  } catch (e) {
    res.status(400).json({
      message: "Server error",
    });
  }
};
