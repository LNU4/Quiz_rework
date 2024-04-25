import express from "express";
import mysql from "mysql2/promise";
//import db from "../db-config.js"
const router = express.Router();

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "quiz_rework",
});

export async function getCityById(cityId) {
	const sql = "SELECT * FROM cities WHERE id = ?";
	const [result] = await db.query(sql, [cityId]);
	return result[0];
}

router.get("/get-all-cities", (req, res) => {
	const sql = "SELECT * FROM cities";
	db.query(sql, (err, results) => {
		if (err) {
			console.error("Error fetching cities:", err);
			res.status(500).json({ error: "Internal server error" });
			return;
		}
		res.json(results);
	});
});

router.get("/get-five-random-cities", (req, res) => {
	const sql = "SELECT * FROM cities ORDER BY RAND() LIMIT 5";
	db.query(sql, (err, results) => {
		if (err) {
			console.error("Error fetching random cities:", err);
			res.status(500).json({ error: "Internal server error" });
			return;
		}
		res.json(results);
	});
});

export default router;
