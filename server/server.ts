import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import recipeRouter from './src/routes/recipe/recipe.router';
import connectDB from './src/config/database';
import { jwtCheck, userCheck } from './src/middleware/auth';
import chalk from 'chalk';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3001;

// connect to MongoDB
connectDB();
console.log(process.env);

// Middleware configuration
app.use(cors()); // Allow cross-origin requests from any origin (adjust as needed)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
// Serve the static files from the server/dist/static folder
app.use(express.static('dist/static'));

// Route all requests except /api to the index.html file
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});
// auth0 verify token and add auth object to req.auth
app.use(jwtCheck());
app.use(userCheck);

// Your API routes

app.use('/api/recipe', recipeRouter);
// Start the server

app.listen(port, () => {
    console.log(chalk.cyanBright(`Server listening on port ${port}`));
});