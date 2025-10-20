import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  totalRooms: { type: Number, default: 10 },  // total available rooms
  bookedRooms: { type: Number, default: 0 },  // rooms already booked
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
