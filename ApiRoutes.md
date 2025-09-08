# API & Frontend Routes
<p> This document outlines all the API endpoints (backend) and the corresponding client-side routes (frontend) for the bus tracking application.
</p>

## Backend API Routes

- The backend API is designed to handle all data operations related to buses and administration. All API routes are prefixed with /api.

Bus Routes

```
GET /api/buses
```
- Description: Fetches a list of all buses and their current locations.

- Response: 200 OK with an array of bus objects.

```
GET /api/buses/:id
```
- Description: Retrieves a single bus's details by its ID.

- Response: 200 OK with a bus object.
```
POST /api/buses/update-location
```
- Description: Updates the real-time location of a specific bus. This is the endpoint used for bus location tracking.

```
Request Body: { "busId": "...", "latitude": ..., "longitude": ... }
```
- Response: 200 OK with the updated bus object.

Admin Routes
```
POST /api/admin/login
```
- Description: Authenticates an administrator.

```
Request Body: { "username": "...", "password": "..." }
```

- Response: 200 OK with an authentication token.

```
POST /api/admin/buses
```
- Description: Adds a new bus to the database.

```
Request Body: { "busName": "...", "route": "...", ... }
```

- Response: 201 Created with the newly created bus object.
```
PUT /api/admin/buses/:id
```
- Description: Updates the details of an existing bus.
```
Request Body: { "busName": "...", "route": "...", ... }
```
- Response: 200 OK with the updated bus object.
```
DELETE /api/admin/buses/:id
```
Description: Deletes a bus from the database.

Response: 200 OK with a confirmation message.

## Frontend Routes
The React application uses react-router-dom to manage different views and pages.
```
/
```
Description: The main landing page. This view displays the interactive map with the real-time location of all buses.
```
/admin
```
Description: The administrator login page. Only authenticated users can access the admin dashboard.
```
/dashboard
```
Description: The admin dashboard. This page allows administrators to manage buses (add, edit, delete). This route is protected and requires a valid session token.