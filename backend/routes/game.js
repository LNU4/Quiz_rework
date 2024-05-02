import express from "express";
import mysql from "mysql2/promise";
import { getCityById } from "./city.js";
const router = express.Router();

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "quiz_rework",
});

async function fetchWeatherData(latitude, longitude) {
	const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&&longitude=${longitude}&current=temperature_2m&minutely_15=temperature_2m&hourly=temperature_2m`;

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Open-Meteo weather API error:", error);
		return null;
	}
}

router.post("/submit-guess", async (req, res) => {
	const { cityId, userGuess } = req.body;

	try {
		const city = await getCityById(cityId);
		if (!city) {
			return res.status(404).json({ error: "City not found" });
		}

		const weatherData = await fetchWeatherData(city.latitude, city.longitude);
		if (!weatherData) {
			return res.status(500).json({ error: "Error fetching weather information" });
		}

		const actualTemperature = weatherData.current.temperature_2m;
		let points = 0;
		let response;
		if (Math.abs(userGuess - actualTemperature) <= 2) {
			response = "Close! You gained 2 points.";
			points = 2;
		} else if (Math.abs(userGuess - actualTemperature) <= 5) {
			response = "Correct! You gained 5 points.";
			points = 5;
		} else {
			response = "Wrong answer. No points gained.";
			points = 0;
		}

		res.json({ response, pointsGained: points });
	} catch (error) {
		console.error("Guess updating error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.post("/finish-game", async (req, res) => {
	const { gameSessionId, answeringUserId, score } = req.body;

	try {
		const sql =
			"INSERT INTO game_session_leaderboard (game_session_id, answering_user_id, score) VALUES (?,?,?)";
		await db.query(sql, [gameSessionId, answeringUserId, score]);
		res.json({ success: true });
	} catch (error) {
		console.error("Error updating leaderboard:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
