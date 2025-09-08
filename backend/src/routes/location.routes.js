// src/routes/location.routes.js
import express from "express";
import { updateLocation, getVehicleLocation, getRouteVehicles } from "../controllers/location.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Driver updates vehicle location
router.post("/update", authMiddleware, updateLocation);

// Passenger fetches specific vehicle location
router.get("/:vehicleId", getVehicleLocation);

// Passenger fetches all vehicles on a route
router.get("/route/:routeId", getRouteVehicles);

export default router;
