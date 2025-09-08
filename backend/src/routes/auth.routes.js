import express from "express";
import { register, login, refreshAccessToken, profile } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login",  login);

// POST /api/auth/refresh
router.post("/refresh",  refreshAccessToken);
router.get("/profile", authMiddleware, profile);

export default router;