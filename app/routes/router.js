import express from "express";
const router = express.Router();
import { db } from "../db.js";

// Get list of full recap sheets for frontend filtering
router.get('/recap', async (req, res) => {
    try {
        const query =  `SELECT DISTINCT(year) FROM recap ORDER BY YEAR ASC`;
        const { rows } = await db.query(query);             
        res.status(200).json(rows);
    } catch (err) {     
        res.status(500).send(err.message);
    }
});

router.get('/semesters/:year', async (req, res) => {
    try {
        const { year } = req.params;
        const query = `SELECT DISTINCT semester FROM recap WHERE year = $1 ORDER BY semester`;
        const { rows } = await db.query(query, [year]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.get('/classes/:year/:semester', async (req, res) => {
    try {
        const { year, semester } = req.params;
        const query = `SELECT DISTINCT class FROM recap WHERE year = $1 AND semester = $2 ORDER BY class`;
        const { rows } = await db.query(query, [year, semester]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/recapid/:year/:semester/:classes', async (req, res) => {
    try {
        const { year, semester, classes } = req.params;
        const query = `SELECT rid FROM recap WHERE year = $1 AND semester = $2 AND class = $3`;
        const { rows } = await db.query(query, [year, semester, classes]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/grade-analysis/:rid', async (req, res) => {
    const { rid } = req.params;

    try {
        const result = await db.query(`
            SELECT 
              g.grade,
              COUNT(*) AS student_count,
              ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage
            FROM (
              SELECT s.regno, SUM(m.marks) AS total_marks
              FROM marks m
              JOIN student s ON m.regno = s.regno
              WHERE m.rid = $1
              GROUP BY s.regno
            ) sm
            JOIN grade g ON sm.total_marks BETWEEN g.start AND g.end
            GROUP BY g.grade
            ORDER BY g.grade;
        `, [rid]);

        res.status(200).json(result.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error retrieving grade analysis");
    }
});


export default router;
