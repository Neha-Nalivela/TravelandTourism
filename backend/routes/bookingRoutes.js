import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Flight from "../models/Flight.js";

const router = express.Router();

// GET all bookings for the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST booking
router.post("/", protect, async (req, res) => {
  const { itemId, type } = req.body;
  const userId = req.user._id;

  try {
    let item, name, price, image;

    if (type === "hotel") {
      item = await Hotel.findById(itemId);
      if (!item) return res.status(404).json({ message: "Hotel not found" });
      if (item.bookedRooms >= item.totalRooms)
        return res.status(400).json({ message: "No rooms available" });

      item.bookedRooms += 1;
      await item.save();

      name = item.name;
      price = item.pricePerNight;
      image = item.image;
    }

    if (type === "flight") {
      item = await Flight.findById(itemId);
      if (!item) return res.status(404).json({ message: "Flight not found" });
      if (item.bookedSeats >= item.totalSeats)
        return res.status(400).json({ message: "No seats available" });

      item.bookedSeats += 1;
      await item.save();

      name = item.airline;
      price = item.price;
      image = item.image;
    }

    const booking = await Booking.create({ user: userId, itemId, type, name, price, image });
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Booking failed" });
  }
});

// DELETE booking
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Update hotel/flight booked count
    if (booking.type === "hotel") {
      const hotel = await Hotel.findById(booking.itemId);
      if (hotel && hotel.bookedRooms > 0) {
        hotel.bookedRooms -= 1;
        await hotel.save();
      }
    }
    if (booking.type === "flight") {
      const flight = await Flight.findById(booking.itemId);
      if (flight && flight.bookedSeats > 0) {
        flight.bookedSeats -= 1;
        await flight.save();
      }
    }

    await booking.deleteOne();
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

export default router;
