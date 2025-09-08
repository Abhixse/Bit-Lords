// src/routes/passenger.routes.js
import express from "express";
import { findNearbyStops, trackBus, getBusesOnRoute } from "../controllers/passenger.controller.js";

const router = express.Router();

// Passenger: find nearby stops
router.get("/nearby", findNearbyStops);

// Passenger: track single bus live
router.get("/track/:vehicleId", trackBus);

// Passenger: see all buses on a route
router.get("/route/:routeId", getBusesOnRoute);

export default router;
