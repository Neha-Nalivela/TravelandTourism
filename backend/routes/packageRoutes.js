//backend/routes/packageRoutes.js
import express from "express";
import Package from "../models/Package.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new package (Admin)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const pack = await Package.create(req.body);
    res.status(201).json(pack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE package by ID (Admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
