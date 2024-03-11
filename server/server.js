const express = require('express');
const cors = require('cors'); // Enable CORS
const { auth } = require('express-oauth2-jwt-bearer');
const recipeRouter = require('./routes/recipe/recipe');

const app = express();
const port = 3001;

// Middleware configuration
app.use(cors()); // Allow cross-origin requests from any origin (adjust as needed)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
const jwtCheck = auth({
    audience: 'https://www.nutritionhub.com',
    issuerBaseURL: 'https://dev-j8r4za1686l0mkr7.uk.auth0.com/',
    tokenSigningAlg: 'RS256'
  });
  
  // enforce on all endpoints
app.use(jwtCheck);
app.use("/api/recipe", recipeRouter);

// Your API routes and other middleware go here
// ...

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});