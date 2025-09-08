import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import authRoutes from  './src/routes/auth.routes.js';

import vehicleRoutes from "./src/routes/Vehical.routes.js";
import locationRoutes from "./src/routes/location.routes.js";
import routeRoutes from "./src/routes/route.routes.js";
import passengerRoutes from "./src/routes/passenger.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(cors(
//     { origin: 'http://localhost:5173', credentials: true }
// ));


app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/route", routeRoutes);
app.use("/api/passenger", passengerRoutes);
app.use("/api/admin", adminRoutes);

export default app;