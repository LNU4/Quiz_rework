import { handleLogoutButtonClick, showMainMenuContainer } from "./main-menu.js";

let currentCityIndex = 0;
let cities = [];

function showGameContainer() {
	let mainMenuGameModeSelectionContainer = document.getElementById(
		"main-menu-game-mode-selection-container"
	);
	let gameContainer = document.getElementById("game-container");
	let cityInfoDiv = document.getElementById("city-info");
	let currentCityIndexDiv = document.getElementById("current-city-index");
	let userGuessInput = document.getElementById("user-guess-input");
	let submitGuessButton = document.getElementById(
		"game-container-submit-guess-button"
	);
	let nextCityButton = document.getElementById("next-city-button");
	let userGuessInfo = document.getElementById("user-guess-info");
	let gameSessionTokenHeader = document.getElementById(
		"game-session-token-header"
	);

	if (currentCityIndex < cities.length) {
		let city = cities[currentCityIndex];
		cityInfoDiv.textContent = `Guess the temperature of ${city.name}`;
		currentCityIndexDiv.textContent = `City ${currentCityIndex + 1} of ${
			cities.length
		}`;
		userGuessInput.value = "";
		userGuessInfo.textContent = "";
		submitGuessButton.style.display = "block";
		nextCityButton.textContent =
			currentCityIndex === cities.length - 1 ? "Finish Game" : "Next City";
		nextCityButton.style.display = "none";
		gameContainer.style.display = "flex";
		mainMenuGameModeSelectionContainer.style.display = "none";
		gameSessionTokenHeader.textContent =
			sessionStorage.getItem("game_session_token");
	} else {
		finishGame();
	}
}

function setupNextCityButton() {
	let nextCityButton = document.getElementById("next-city-button");
	nextCityButton.addEventListener("click", () => {
		if (currentCityIndex === cities.length - 1) {
			finishGame();
		} else {
			document.getElementById("user-guess-info").textContent = "";
			currentCityIndex++;
			showGameContainer();
		}
	});
}
async function startNewGame() {
	const userId = sessionStorage.getItem("logged_in_user_id");
	sessionStorage.setItem("score", 0);
	try {
		const response = await fetch(
			"http://localhost:3000/api/menu/create-game-session",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId }),
			}
		);
		const data = await response.json();
		if (data.success) {
			cities = data.cities;
			sessionStorage.setItem("game_session_id", data.sessionId);
			sessionStorage.setItem("game_session_token", data.sessionToken);
			currentCityIndex = 0;
			showGameContainer();
		} else {
			console.error("Failed to start game");
		}
	} catch (error) {
		console.error("Error starting game:", error);
	}
}

async function joinGame() {
	const sessionTokenInput = document.getElementById(
		"main-menu-game-mode-selection-session-input"
	);
	const sessionToken = sessionTokenInput.value;

	if (!sessionToken) {
		alert("Please enter a valid session token.");
		return;
	}

	try {
		const response = await fetch(
			"http://localhost:3000/api/menu/join-game-session",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ sessionToken }),
			}
		);
		const data = await response.json();

		if (data.success) {
			cities = data.cities;
			sessionStorage.setItem("game_session_id", data.sessionId);
			sessionStorage.setItem("game_session_token", data.sessionToken);
			sessionStorage.setItem("score", 0);
			currentCityIndex = 0;
			showGameContainer();
		} else {
			alert("Failed to join game: " + data.error);
		}
	} catch (error) {
		console.error("Error joining game:", error);
		alert("An error occurred while trying to join the game.");
	}
}

async function submitGuess() {
	let city = cities[currentCityIndex];
	let userGuessInput = document.getElementById("user-guess-input");
	let userGuess = parseFloat(userGuessInput.value);

	try {
		let response = await fetch("http://localhost:3000/api/game/submit-guess", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ cityId: city.id, userGuess }),
		});
		let result = await response.json();
		let score = parseInt(sessionStorage.getItem("score")) || 0;

		score += result.pointsGained;
		sessionStorage.setItem("score", score);

		document.getElementById("user-guess-info").textContent = result.response;
		document.getElementById("next-city-button").style.display = "block";
		document.getElementById(
			"game-container-submit-guess-button"
		).style.display = "none";
	} catch (error) {
		console.error("Guess submission error:", error);
	}
}

function backToMainMenu() {
	sessionStorage.removeItem("current_city_index");
	sessionStorage.removeItem("game_session_id");
	sessionStorage.removeItem("game_session_token");
	sessionStorage.removeItem("score");
	sessionStorage.removeItem("cities");
	showMainMenuContainer();
	document.getElementById("game-container").style.display = "none";
	document.getElementById("game-results-container").style.display = "none";
}

function updateGameResults(message) {
	let resultsContainer = document.getElementById("game-results-container");
	resultsContainer.textContent = message;
	resultsContainer.style.display = "flex";
	resultsContainer.style.flexDirection = "column";
	resultsContainer.style.width = "20%";
}

async function finishGame() {
	let nextCityButton = document.getElementById("next-city-button");
	nextCityButton.style.display = "none";

	let gameSessionId = sessionStorage.getItem("game_session_id");
	let answeringUserId = sessionStorage.getItem("logged_in_user_id");
	let score = sessionStorage.getItem("score");
	document.getElementById("user-guess-info").textContent = "";

	try {
		let response = await fetch("http://localhost:3000/api/game/finish-game", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ gameSessionId, answeringUserId, score }),
		});
		let data = await response.json();
		if (data.success) {
			updateGameResults(`Game finished! Your score: ${score}`);
			let mainMenuButton = document.createElement("button");
			mainMenuButton.textContent = "Go to Main Menu";
			mainMenuButton.addEventListener("click", backToMainMenu);
			document
				.getElementById("game-results-container")
				.appendChild(mainMenuButton);

			showSessionLeaderboard();
		} else {
			console.error("Failed to update leaderboard");
		}
	} catch (error) {
		console.error("Error updating leaderboard:", error);
	}
}

async function showSessionLeaderboard() {
	let resultsContainer = document.getElementById(
		"main-menu-leaderboard-results-container"
	);

	let sessionToken = sessionStorage.getItem("game_session_token");
	if (!sessionToken) {
		alert("Please enter a valid session token.");
		return;
	}

	try {
		const response = await fetch(
			`http://localhost:3000/api/menu/leaderboard?sessionToken=${sessionToken}`
		);
		const data = await response.json();
		if (data.success) {
			let scores = data.scores;
			let resultsContainer = document.getElementById(
				"main-menu-leaderboard-results-container"
			);
			resultsContainer.style.display = "block";
			resultsContainer.innerHTML = "";

			if (scores.length === 0) {
				resultsContainer.textContent = "No scores available for this session.";
				return;
			}

			let table = document.createElement("table");
			let thead = document.createElement("thead");
			let tbody = document.createElement("tbody");

			let headerRow = document.createElement("tr");
			let nameHeader = document.createElement("th");
			nameHeader.textContent = "Username";
			let scoreHeader = document.createElement("th");
			scoreHeader.textContent = "Score";
			headerRow.appendChild(nameHeader);
			headerRow.appendChild(scoreHeader);
			thead.appendChild(headerRow);

			table.appendChild(thead);

			scores.forEach((score) => {
				let row = document.createElement("tr");
				let nameCell = document.createElement("td");
				nameCell.textContent = score.username;
				let scoreCell = document.createElement("td");
				scoreCell.textContent = score.score;
				row.appendChild(nameCell);
				row.appendChild(scoreCell);
				tbody.appendChild(row);
			});

			table.appendChild(tbody);

			resultsContainer.appendChild(table);
			resultsContainer.style.display = "block";
		} else {
			alert("Failed to fetch leaderboard: " + data.error);
		}
	} catch (error) {
		console.error("Error fetching leaderboard:", error);
		alert("An error occurred while trying to fetch the leaderboard.");
	}
}

document.addEventListener("DOMContentLoaded", () => {
	setupNextCityButton();
});
export { showGameContainer, startNewGame, joinGame, submitGuess };
