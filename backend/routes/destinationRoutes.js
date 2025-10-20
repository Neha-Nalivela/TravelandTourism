import express from "express";
import Destination from "../models/Destination.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new destination (Admin)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE destination by ID (Admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: "Destination deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
