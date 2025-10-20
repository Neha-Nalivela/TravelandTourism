import express from "express";
import Flight from "../models/Flight.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all flights
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new flight (Admin)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE flight by ID (Admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: "Flight deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
