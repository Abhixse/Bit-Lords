import Location from "../models/location.models.js";
import Route from "../models/route.model.js";
import Vehicle from "../models/Vehical.models.js";

// Find nearby stops (simple example)
export const findNearbyStops = async (req, res) => {
  const { lat, lng } = req.query;
  const stops = await Route.aggregate([
    { $unwind: "$stops" },
    { $project: {
        name: "$stops.name",
        location: "$stops.coordinates",
        distance: {
          $sqrt: { 
            $add: [
              { $pow: [{ $subtract: ["$stops.coordinates.lat", parseFloat(lat)] }, 2] },
              { $pow: [{ $subtract: ["$stops.coordinates.lng", parseFloat(lng)] }, 2] }
            ]
          }
        }
      }
    },
    { $sort: { distance: 1 } },
    { $limit: 5 }
  ]);
  res.json(stops);
};

// Track single bus
export const trackBus = async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const location = await Location.findOne({ vehicleId });
  if (!location) return res.status(404).json({ message: "Bus not found" });
  res.json(location);
};

// Get all buses on a route
export const getBusesOnRoute = async (req, res) => {
  const routeId = req.params.routeId;
  const vehicles = await Vehicle.find({ routeId });
  res.json(vehicles);
};
