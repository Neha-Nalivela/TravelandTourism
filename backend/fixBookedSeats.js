import mongoose from "mongoose";
import dotenv from "dotenv";
import Flight from "./models/Flight.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI, { dbName: "TravelandTourism" });

console.log("✅ Connected to MongoDB");

const flights = await Flight.find({});
for (const f of flights) {
  if (!Array.isArray(f.bookedSeats)) {
    console.log(`Fixing flight ${f._id} (bookedSeats was type: ${typeof f.bookedSeats})`);

    // If bookedSeats is a number, wrap it in an array; otherwise empty array
    let fixedSeats = [];
    if (typeof f.bookedSeats === "number") {
      fixedSeats = [f.bookedSeats];
    }

    await Flight.updateOne(
      { _id: f._id },
      { $set: { bookedSeats: fixedSeats } }
    );
  }
}

console.log("🎉 All flights fixed!");
await mongoose.disconnect();
