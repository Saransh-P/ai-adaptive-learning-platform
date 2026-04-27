import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import {pool} from './db/index.js'; // Import the Pool class from the db folder - index.js
import questionRoutes from './routes/questionRoutes.js'; // Import the question routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', questionRoutes); // Use the question routes for any requests to /api/questions

app.get('/', (req, res) => {
  res.send('Main Page, say hi !!');
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()"); // Execute a simple query to test the database connection - returns the current timestamp
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

