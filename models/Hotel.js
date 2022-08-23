import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  profile: {
    avatar: {
      type: String,
      required: true,
    },
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  price: {
    type: [String],
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  info: {
    bedroom: {
      type: String,
      required: true,
    },
    bathroom: {
      type: String,
      required: true,
    },
  },

  type: {
    type: [String],
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  coords: {
    type: [String],
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  popularity: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  amenities: [
    {
      icon: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: {
    author: {
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    date: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model("Hotel", HotelSchema);
