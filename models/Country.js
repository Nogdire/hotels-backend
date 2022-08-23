import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Country", CountrySchema);
