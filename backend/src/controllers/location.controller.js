import Location from "../models/location.models.js";
import Vehicle from "../models/Vehical.models.js";

// Driver updates location
export const updateLocation = async (req, res) => {
  try {
    if (req.user.role !== "driver") return res.status(403).json({ message: "Only drivers can update location" });

    const { vehicleId, latitude, longitude } = req.body;

    if (!vehicleId || !latitude || !longitude) {
      return res.status(400).json({ message: "vehicleId, latitude, and longitude are required" });
    }

    const location = await Location.findOneAndUpdate(
      { vehicleId },
      { vehicleId, coordinates: { type: "Point", coordinates: [longitude, latitude] } },
      { new: true, upsert: true }
    );

    res.json({ message: "Location updated", location });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get vehicle location
export const getVehicleLocation = async (req, res) => {
  try {
    const location = await Location.findOne({ vehicleId: req.params.vehicleId });
    if (!location) return res.status(404).json({ message: "Location not found" });
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all vehicles on a route
export const getRouteVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ routeId: req.params.routeId });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
