import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { ApiError } from './utils/ApiError.js';
import adminRouter from './routes/admin.routes.js';
import adoptionRouter from './routes/adoption.routes.js';

// Configure environment variables
dotenv.config({
  path: './.env',
});

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", // Adjust for your frontend URL in production
    credentials: true
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Database connection
connectDB();

// --- Routes ---
import petRouter from './routes/pet.routes.js';

// Route declaration
app.use('/api/v1/pets', petRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/adoptions', adoptionRouter);


// Central Error Handling Middleware (must be last)
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }

    // For unhandled errors
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
});


app.listen(process.env.PORT || 8000, () => {
  console.log(`⚙️  Server is running at port : ${process.env.PORT || 8000}`);
});