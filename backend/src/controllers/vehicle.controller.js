import Vehicle from "../models/Vehical.models.js";
import User from "../models/User.models.js";
import Route from "../models/Route.model.js";

// Create Vehicle (Admin)
export const createVehicle = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const { vehicleId, driverId, routeId,  } = req.body;

    if (!vehicleId || !driverId || !routeId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.json(vehicle);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all vehicles (public)
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update vehicle
export const updateVehicle = async (req, res) => {
  try {
    if (!["admin", "driver"].includes(req.user.role)) return res.status(403).json({ message: "Not allowed" });
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete vehicle
export const deleteVehicle = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
