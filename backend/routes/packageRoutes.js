/*import express from "express";
import Package from "../models/Package.js";

const router = express.Router();

// Get all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new package
router.post("/", async (req, res) => {
  const { name, image, price, details } = req.body;
  try {
    const newPackage = await Package.create({ name, image, price, details });
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
*/
import express from "express";
import { samplePackages } from "../data.js";

const router = express.Router();

// GET all packages
router.get("/", (req, res) => {
  res.json(samplePackages);
});

export default router;
