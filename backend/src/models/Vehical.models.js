import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true, unique: true }, // e.g., "BUS101"
    type: { type: String, enum: ["bus", "auto", "van"], default: "bus" },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
    isActive: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
