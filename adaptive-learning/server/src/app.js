//Importing necessary modules and libraries
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//Importing classes and routes from other files
import {pool} from './db/index.js'; // Import the Pool class from the db folder - index.js
import questionRoutes from './routes/questionRoutes.js'; // Import the question routes

//Load environment variables from .env file
dotenv.config();

//Create an instance of the Express application
const app = express();

//Middleware to enable CORS and parse JSON request bodies
app.use(cors());
app.use(express.json());


app.use('/api', questionRoutes); // Use the question routes for any requests to /api

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Main Page, say hi !!');
});

// Define a test route to check database connectivity
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()"); // Execute a simple query to test the database connection - returns the current timestamp
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start the server and listen on the specified port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

