import express from 'express';
import cors from 'cors';
import authRoutes from  './src/routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(
    { origin: 'http://localhost:5173', credentials: true }
));


app.use("/api/auth", authRoutes);


export default app;