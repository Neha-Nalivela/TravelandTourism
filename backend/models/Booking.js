import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: { type: String, enum: ["hotel", "flight"], required: true },
  name: { type: String },       // hotel name / flight airline
  price: { type: Number },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
