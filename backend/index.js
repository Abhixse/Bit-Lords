import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config(
    {
        path: ".env"
    }
);

const PORT = process.env.PORT || 8000;


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // later restrict to frontend domain
    },
});

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Driver sends location updates
    socket.on("driver:updateLocation", (data) => {
        // { vehicleId, coordinates }
        console.log("Location update:", data);
        // Broadcast to all passengers
        io.emit("passenger:locationUpdate", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
});

