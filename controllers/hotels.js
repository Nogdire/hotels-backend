import Country from "../models/Country.js";
import Hotel from "../models/Hotel.js";

export const getLocation = async (_, res) => {
  try {
    const countries = await Country.find({}, { _id: 0 });

    return res.status(200).json(countries);
  } catch (e) {
    return res.status(401).json({
      message: "Error getting data",
    });
  }
};

export const getHotelDetails = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(401).json({
        message: "Hotel isn't exist",
      });
    }

    return res.status(200).json(hotel);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: "Getting data error",
    });
  }
};

export const getLatestHotels = async (_, res) => {
  try {
    const data = await Hotel.find(
      {},
      { profile: 1, _id: 1, image: 1, name: 1, address: 1 }
    )
      .sort({ popularity: -1 })
      .limit(4);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(401).json({ message: "Getting data error" });
  }
};

export const getFeaturedHotels = async (_, res) => {
  try {
    const data = await Hotel.find(
      {},
      {
        profile: 1,
        _id: 1,
        image: 1,
        name: 1,
        address: 1,
        price: 1,
        images: 1,
        info: 1,
      }
    )
      .sort({ rating: 1 })
      .limit(6);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(401).json({ message: "Getting data error" });
  }
};

export const filterHotels = async (req, res) => {
  try {
    const { location } = req.body;

    const result = await Hotel.find(
      { "address.country": location },
      {
        profile: 1,
        _id: 1,
        image: 1,
        name: 1,
        address: 1,
        price: 1,
        images: 1,
        info: 1,
      }
    );

    return res.status(200).json(result);
  } catch (e) {
    return res.status(401).json({ message: "Getting data error" });
  }
};
