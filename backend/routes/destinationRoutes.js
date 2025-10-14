/*import express from "express";
import Destination from "../models/Destination.js";

const router = express.Router();

// Get all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new destination
router.post("/", async (req, res) => {
  const { name, image, description } = req.body;
  try {
    const newDest = await Destination.create({ name, image, description });
    res.status(201).json(newDest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
*/
import express from "express";
import Destination from "../models/Destination.js"; // import the model

const router = express.Router();

// GET all destinations from MongoDB
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find(); // fetch from database
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
