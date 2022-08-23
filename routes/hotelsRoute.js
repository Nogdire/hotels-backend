import { Router } from "express";
import {
  getLocation,
  getHotelDetails,
  getLatestHotels,
  getFeaturedHotels,
  filterHotels,
} from "../controllers/hotels.js";

const router = new Router();

// Get all countries
router.get("/location", getLocation);

//Get hotel by id
router.get("/detail/:id", getHotelDetails);

//Get latets hotels list
router.get("/latest", getLatestHotels);

//Get featured hotels list
router.get("/featured", getFeaturedHotels);

//Filter hotels
router.post("/filter", filterHotels);

export default router;
