import { Router } from "express";
import {
  getFavorites,
  reserveHotel,
  addToFavorites,
  removeFromFavorites,
} from "../controllers/user.js";
import { checkAuth } from "../utils/checkAuth.js";
import { reserveValidation } from "../validations/validations.js";

const router = new Router();

//Reserve hotel
router.post("/reserve", reserveValidation, reserveHotel);

// Get favorites
router.get("/favorites", checkAuth, getFavorites);

//Add hotel to favorites
router.post("/addToFav", checkAuth, addToFavorites);

// Remove from favorites
router.delete("/removeFav", checkAuth, removeFromFavorites);

export default router;
