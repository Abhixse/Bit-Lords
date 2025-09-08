import mongoose from "mongoose";

const liveLocationSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true } // [lng, lat]
  },
  timestamp: { type: Date, default: Date.now }
});

// Geo index for fast lookups
liveLocationSchema.index({ location: "2dsphere" });

const LiveLocation = mongoose.model("LiveLocation", liveLocationSchema);
export default LiveLocation;
