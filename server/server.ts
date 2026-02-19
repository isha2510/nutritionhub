import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import recipeRouter from './src/routes/recipe/recipe.router';
import tagRouter from './src/routes/tag/tag.router';
import adminRouter from './src/routes/admin/admin.router';
import favoriteRouter from './src/routes/favorite/favorite.router';
import aiRouter from './src/routes/ai/ai.router';
import connectDB from './src/config/database';
import { jwtCheck, userCheck } from './src/middleware/auth';
import chalk from 'chalk';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3001;

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
app.use('/api/tag', tagRouter);
app.use('/api/admin', adminRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/api/ai', aiRouter);
// Start the server

app.listen(port, () => {
    console.log(chalk.cyanBright(`Server listening on port ${port}`));
});