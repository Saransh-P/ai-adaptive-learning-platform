import express from 'express';
import {pool} from '../db/index.js'; // Import the Pool class from the db folder - index.js

const router = express.Router();

router.get('/get-question', async (req,res) => {
    const {topic_id , difficulty} = req.query; // Get topic_id and difficulty from query parameters

    try {
        const result = await pool.query(
            `SELECT * FROM questions
            WHERE topic_id = $1 AND difficulty = $2
            LIMIT 1`, 
            [topic_id, difficulty]
        );
    
        res.json(result.rows[0]); // Return the first question that matches the criteria
    
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;