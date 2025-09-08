import express from "express";
import Vehicle from "../models/Vehicle.model.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * Add new vehicle (Admin only)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can add vehicles" });
    }

    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get all vehicles (public / passengers)
 */
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("driver route");
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Activate / Deactivate vehicle (Driver)
 */
router.put("/:id/toggle", authMiddleware, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    if (vehicle.driver.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    vehicle.isActive = !vehicle.isActive;
    await vehicle.save();
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
