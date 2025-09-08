# Bit-Lords
## Real-Time Public Transport Tracking for Small Cities

Real-Time Bus Tracking System
This is a full-stack, real-time bus tracking system built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to view the live location of buses on a map and provides an administrative interface for managing bus data.

Features
Real-Time Tracking: See the live location of buses on an interactive map.

Admin Panel: A secure interface for administrators to add, update, and manage bus information and routes.

User-Friendly Interface: A clean and responsive design built with React.

RESTful API: A well-structured backend powered by Express.js to handle all data and real-time communication.

Database: Data persistence using MongoDB.

Technologies Used
Backend (Node.js/Express)
Express.js: The web application framework for building the server and API.

Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.

Socket.IO: For enabling real-time, bidirectional communication between the client and server.

CORS: A Node.js middleware to handle Cross-Origin Resource Sharing.

dotenv: To manage environment variables securely.

nodemon: A utility that monitors for changes in your source and automatically restarts your server (used during development).

Frontend (React)
React: A JavaScript library for building the user interface.

React Router DOM: For handling client-side routing.

Axios: A promise-based HTTP client for making API requests.

React-Leaflet: A React component for Leaflet maps, used for displaying the bus locations.

Socket.IO Client: The client-side library to connect with the Socket.IO server.

Bootstrap: For styling and responsive design.

Installation
Prerequisites
Make sure you have Node.js and npm installed on your system.

Steps
Clone the repository:

git clone <your-repository-url>
cd <your-repository-folder>

Install backend dependencies:

cd backend
npm install

Create a .env file in the backend directory:

PORT=5000
MONGODB_URI=<your_mongodb_connection_string>

Replace <your_mongodb_connection_string> with your actual MongoDB connection string.

Install frontend dependencies:

cd ../frontend
npm install

Usage
To run the backend server:
cd backend
npm start

The server will run on the port specified in your .env file (e.g., http://localhost:5000).

To run the frontend application:
cd frontend
npm start

The application will open in your default browser at http://localhost:3000.

License
This project is licensed under the MIT License.