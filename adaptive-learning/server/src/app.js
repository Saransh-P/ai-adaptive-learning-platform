import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import {pool} from './db/index.js'; // Import the Pool class from the db folder - index.js

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()"); // Execute a simple query to test the database connection - returns the current timestamp
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});