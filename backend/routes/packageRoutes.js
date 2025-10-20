import express from "express";
import Package from "../models/Package.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
});

router.post("/", async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
