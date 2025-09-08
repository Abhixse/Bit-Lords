import User from "../models/User.models.js";
import Vehicle from "../models/Vehical.models.js";
import Location from "../models/location.models.js";

// System overview
export const getOverview = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

  const vehicleCount = await Vehicle.countDocuments();
  const driverCount = await User.countDocuments({ role: "driver" });
  const passengerCount = await User.countDocuments({ role: "passenger" });
  const activeLocations = await Location.countDocuments();

  res.json({ vehicleCount, driverCount, passengerCount, activeLocations });
};

// Drivers activity
export const getDriverActivity = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

  const drivers = await User.find({ role: "driver" }).select("fullName email");
  const activity = [];

  for (let driver of drivers) {
    const vehicle = await Vehicle.findOne({ driverId: driver._id });
    const location = vehicle ? await Location.findOne({ vehicleId: vehicle._id }) : null;
    activity.push({ driver, vehicle, location });
  }

  res.json(activity);
};
