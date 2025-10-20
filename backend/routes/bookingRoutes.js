import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Flight from "../models/Flight.js";

const router = express.Router();

// GET all bookings for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// POST booking (hotels/flights only)
router.post("/", protect, async (req, res) => {
  const { itemId, type, selectedSeats = [] } = req.body;
  const userId = req.user._id;

  try {
    let item, name, price, image, seats = [];

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

      // Ensure bookedSeats is an array (fix if some old docs have number)
      if (!Array.isArray(item.bookedSeats)) {
        console.log(`Fixing bookedSeats for flight ${item._id}`);
        item.bookedSeats = [];
      }

      // Check seat availability
      for (let seat of selectedSeats) {
        if (item.bookedSeats.includes(seat))
          return res.status(400).json({ message: `Seat ${seat} is already booked` });
      }

      // Add selected seats
      item.bookedSeats.push(...selectedSeats);
      await item.save();

      name = item.airline;
      price = item.price * selectedSeats.length;
      image = item.image;
      seats = selectedSeats;
    }

    const booking = await Booking.create({
      user: userId,
      itemId,
      type,
      name,
      price,
      image,
      seats,
    });

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

    if (booking.type === "hotel") {
      const hotel = await Hotel.findById(booking.itemId);
      if (hotel && hotel.bookedRooms > 0) {
        hotel.bookedRooms -= 1;
        await hotel.save();
      }
    }

    if (booking.type === "flight") {
      const flight = await Flight.findById(booking.itemId);
      if (flight) {
        // Ensure bookedSeats is an array
        if (!Array.isArray(flight.bookedSeats)) flight.bookedSeats = [];
        if (booking.seats) {
          flight.bookedSeats = flight.bookedSeats.filter(
            (s) => !booking.seats.includes(s)
          );
        }
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
