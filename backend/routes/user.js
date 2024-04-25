import express from "express";
import mysql from "mysql2";
//import db from "../db-config.js";

const router = express.Router();

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "quiz_rework",
});

router.post("/login", (req, res) => {
	
	const { username, password } = req.body;
	const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
	db.query(sql, [username, password], (err, results) => {
		if (err) {
			console.error("Error login query:", err);
			res.status(500).json({ error: "Internal server error" });
			return;
		}

		if (results.length > 0) {
			res.json({ success: true, userId: results[0].id });
		} else {
			res.status(401).json({ success: false });
		}
	});
});

router.post("/register", (req, res) => {
	const { username, password } = req.body;
	const sql = "INSERT INTO users (username, password) VALUES (?, ?);";
	db.query(sql, [username, password], (err, results) => {
		if (err) {
			console.error("Error register query:", err);
			res.status(500).json({ error: "Internal server error" });
			return;
		}

		if (results.insertId) {
			res.json({ success: true, userId: results.insertId });
		} else {
			res.status(500).json({ success: false });
		}
	});
});

export default router;
