import mongoose from "mongoose";

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true } // [lng, lat]
  }
});

const routeSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  stops: [stopSchema],
  schedule: {
    startTime: { type: String, required: true }, // "08:00"
    frequency: { type: String, required: true }  // "30m"
  },
  createdAt: { type: Date, default: Date.now }
});

routeSchema.index({ "stops.coordinates": "2dsphere" }); // for geo queries

const Route = mongoose.model("Route", routeSchema);
export default Route;
