import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: String },
  details: [{ type: String }],
});

const Package = mongoose.model("Package", packageSchema);
export default Package;
