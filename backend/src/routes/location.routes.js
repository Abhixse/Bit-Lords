import express from "express";
import LiveLocation from "../models/LiveLocation.model.js";
import Vehicle from "../models/Vehicle.model.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * Update vehicle location (Driver only)
 */
router.post("/update", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Only drivers can update location" });
    }

    const { vehicleId, coordinates } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    if (vehicle.driver.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not assigned to this vehicle" });
    }

    const location = new LiveLocation({
      vehicle: vehicleId,
      location: { type: "Point", coordinates }
    });

    await location.save();
    res.json({ message: "Location updated", location });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get live locations of active vehicles (Passenger / Public)
 */
router.get("/all", async (req, res) => {
  try {
    const locations = await LiveLocation.find()
      .populate("vehicle")
      .sort({ timestamp: -1 });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
