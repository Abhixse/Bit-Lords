import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
        unique: true
    }, // e.g., "BUS101"
    type: {
        type: String,
        enum: ["bus", "auto", "van"],
        default: "bus"
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    routeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Route",
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;