import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId }, // optional for packages
  type: { type: String, enum: ["hotel", "flight"], required: true }, // package is frontend-only
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  seats: { type: [String], default: [] }, // for flights
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
