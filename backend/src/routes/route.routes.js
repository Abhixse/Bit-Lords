// src/routes/route.routes.js
import express from "express";
import { createRoute, getRoutes, getRouteById } from "../controllers/route.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin: create bus route
router.post("/create", authMiddleware, createRoute);

// Public: get all routes
router.get("/", getRoutes);

// Public: get single route with stops + assigned vehicles
router.get("/:id", getRouteById);

export default router;
