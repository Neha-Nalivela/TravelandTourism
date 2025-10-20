import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
