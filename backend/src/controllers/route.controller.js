import Route from "../models/route.model.js";

// Admin creates route
export const createRoute = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
    const route = new Route(req.body);
    await route.save();
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Public get all routes
export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get route by ID
export const getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate("vehicles");
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
