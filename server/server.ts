import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer';
import recipeRouter from './routes/recipe/recipe';

// Load environment variables from .env file
dotenv.config({ path: __dirname + '/.env' });

const app = express();
const port = 3001;

// Middleware configuration
app.use(cors()); // Allow cross-origin requests from any origin (adjust as needed)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

const jwtCheck = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: process.env.ALGORITHM
});

app.use(jwtCheck); // auth0 verify token and add auth object to req.auth

// Your API routes and other middleware go here

app.use('/api/recipe', recipeRouter);
// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});