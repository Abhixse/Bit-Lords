// src/routes/vehicle.routes.js
import express from "express";
import { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle } from "../controllers/vehicle.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin: create new vehicle
router.post("/create", authMiddleware, createVehicle);

// Public: get all vehicles
router.get("/", getVehicles);

// Public: get vehicle by ID
router.get("/:id", getVehicleById);

// Admin/Driver: update vehicle
router.put("/:id", authMiddleware, updateVehicle);

// Admin: delete vehicle
router.delete("/:id", authMiddleware, deleteVehicle);

export default router;
