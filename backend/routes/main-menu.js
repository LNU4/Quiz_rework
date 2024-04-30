import express from "express";
import mysql from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
//import db from "../db-config.js"

const router = express.Router();

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "quiz_rework",
});

router.post("/create-game-session", async (req, res) => {
	const { userId } = req.body;
	const sessionToken = uuidv4();

	let connection = await db.getConnection();
	try {
		await connection.beginTransaction();

		const sessionSql =
			"INSERT INTO game_sessions (session_token, creating_user_id) VALUES (?, ?)";
		const [sessionResults] = await connection.query(sessionSql, [
			sessionToken,
			userId,
		]);
		const sessionId = sessionResults.insertId;

		const citySql = "SELECT * FROM cities ORDER BY RAND() LIMIT 5";
		const [cities] = await connection.query(citySql);

		const sessionCitiesSql =
			"INSERT INTO game_session_cities (game_session_id, city_id) VALUES ?";
		const cityValues = cities.map((city) => [sessionId, city.id]);
		await connection.query(sessionCitiesSql, [cityValues]);

		await connection.commit();
		res.json({ success: true, sessionId, sessionToken, cities });
	} catch (error) {
		await connection.rollback();
		console.error("Error creating game session:", error);
		res.status(500).json({ error: "Error creating game session" });
	} finally {
		if (connection) connection.release();
	}
});

router.post("/join-game-session", async (req, res) => {
	const { sessionToken } = req.body;

	let connection;
	try {
		connection = await db.getConnection();
		await connection.beginTransaction();

		const sessionSql = "SELECT id FROM game_sessions WHERE session_token = ?";
		const [sessions] = await connection.query(sessionSql, [sessionToken]);
		if (sessions.length === 0) {
			await connection.rollback();
			res.status(404).json({ error: "Session do not exist" });
			return;
		}
		const sessionId = sessions[0].id;

		const citiesSql =
			"SELECT cities.* FROM cities JOIN game_session_cities ON cities.id = game_session_cities.city_id WHERE game_session_cities.game_session_id = ?";
		const [cities] = await connection.query(citiesSql, [sessionId]);

		await connection.commit();
		res.json({
			success: true,
			sessionId,
			sessionToken,
			cities,
		});
	} catch (error) {
		if (connection) {
			await connection.rollback();
		}
		console.error("Error join game session:", error);
		res.status(500).json({ error: "Internal server error" });
	} finally {
		if (connection) connection.release();
	}
});

router.get("/leaderboard", async (req, res) => {
	const { sessionToken } = req.query;

	try {
		const sessionCheckSql =
			"SELECT id FROM game_sessions WHERE session_token = ?";
		const [sessions] = await db.query(sessionCheckSql, [sessionToken]);

		if (sessions.length === 0) {
			res.status(404).json({ error: "No session found" });
			return;
		}

		const sessionId = sessions[0].id;
		const leaderboardSql =
			"SELECT users.username, game_session_leaderboard.score FROM game_session_leaderboard JOIN users ON game_session_leaderboard.answering_user_id = users.id WHERE game_session_leaderboard.game_session_id = ?";
		const [scores] = await db.query(leaderboardSql, [sessionId]);

		res.json({ success: true, scores });
	} catch (error) {
		console.error("Error fetching leaderboard:", error);
		res.status(500).json({ error: "Error fetching leaderboard" });
	}
});

export default router;
