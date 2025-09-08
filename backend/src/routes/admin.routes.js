// src/routes/admin.routes.js
import express from "express";
import { getOverview, getDriverActivity } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin: system overview
router.get("/overview", authMiddleware, getOverview);

// Admin: drivers' last activity
router.get("/driver-activity", authMiddleware, getDriverActivity);

export default router;
