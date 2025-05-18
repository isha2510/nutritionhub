import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import recipeRouter from '../../src/routes/recipe/recipe.router';
import adminRouter from '../../src/routes/admin/admin.router';
import connectDB from '../../src/config/database';
import { jwtCheck, userCheck } from '../../src/middleware/auth';
import chalk from 'chalk';
import serverless from "serverless-http";

// Load environment variables from .env file
dotenv.config();

const app = express();

// connect to MongoDB
connectDB();

// Middleware configuration
app.use(cors()); // Allow cross-origin requests from any origin (adjust as needed)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
// auth0 verify token and add auth object to req.auth
app.use(jwtCheck());
app.use(userCheck);

// Your API routes
app.use('/api/recipe', recipeRouter);
app.use('/api/admin', adminRouter);
// Start the server

export const handler = serverless(app);