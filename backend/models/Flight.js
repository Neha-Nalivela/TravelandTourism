// backend/models/Flight.js
import mongoose from "mongoose";

const flightSchema = mongoose.Schema({
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  price: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  bookedSeats: { type: [String], default: [] }, // ✅ Change here: array of seat labels
  image: { type: String },
});

const Flight = mongoose.model("Flight", flightSchema);
export default Flight;
