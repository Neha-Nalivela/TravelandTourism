//backend/routes/bookingRoutes.js
import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all bookings of logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new booking (only if user is logged in)
router.post("/", protect, async (req, res) => {
  const { name, type, price, image } = req.body;

  try {
    const booking = await Booking.create({
      user: req.user._id,  // link booking to logged-in user
      name,
      type,
      price,
      image,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a booking by ID (only if user owns it)
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await booking.remove();
    res.json({ message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
