import mongoose from "mongoose";

const flightSchema = mongoose.Schema({
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  departure: { type: Date },
  arrival: { type: Date },
  totalSeats: { type: Number, default: 100 },
  bookedSeats: { type: Number, default: 0 },
});

const Flight = mongoose.model("Flight", flightSchema);
export default Flight;
