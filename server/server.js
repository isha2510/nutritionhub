const express = require('express');
const cors = require('cors'); // Enable CORS
const recipeRouter = require('./routes/recipe/recipe');

const app = express();
const port = 3001;

// Middleware configuration
app.use(cors()); // Allow cross-origin requests from any origin (adjust as needed)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use("/api/recipe", recipeRouter);

// Your API routes and other middleware go here
// ...

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});