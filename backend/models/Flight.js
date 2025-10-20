//backend/models/Flight.js
import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  departure: { type: String },
  arrival: { type: String },
  image: { type: String },
});

const Flight = mongoose.model("Flight", flightSchema);
export default Flight;
