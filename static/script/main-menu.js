import { startNewGame, joinGame } from "./game.js";

function showMainMenuContainer() {
	let loginContainer = document.getElementById("login-container");
	let registerContainer = document.getElementById("register-container");
	let mainMenuContainer = document.getElementById("main-menu-container");
	let mainMenuGameModeSelectionContainer = document.getElementById(
		"main-menu-game-mode-selection-container"
	);
	let leaderboardContainer = document.getElementById(
		"main-menu-leaderboard-container"
	);
	let leaderboardResultsContainer = document.getElementById(
		"main-menu-leaderboard-results-container"
	);
	leaderboardResultsContainer.style.display = "none";

	let gameContainer = document.getElementById("game-container");

	loginContainer.style.display = "none";
	registerContainer.style.display = "none";
	mainMenuContainer.style.display = "flex";
	mainMenuGameModeSelectionContainer.style.display = "none";
	leaderboardContainer.style.display = "none";
	gameContainer.style.display = "none";
}

function showGameModeSelectionContainer() {
	let mainMenuContainer = document.getElementById("main-menu-container");
	let gameModeSelectionContainer = document.getElementById(
		"main-menu-game-mode-selection-container"
	);

	mainMenuContainer.style.display = "none";
	gameModeSelectionContainer.style.display = "flex";
}

function handlePlayButtonClick() {
	showGameModeSelectionContainer();
}

function handleGameModeSelectionBackButtonClick() {
	showMainMenuContainer();
}

function handleCreateNewGameButtonClick() {
	startNewGame();
}

function handleJoinGameButtonClick() {
	joinGame();
}

function handleLeaderboardButtonClick() {
	document.getElementById("leaderboard-session-input").value = "";
	document.getElementById("main-menu-leaderboard-results-container").innerHTML =
		"";
	document.getElementById("main-menu-leaderboard-info-msg").textContent = "";
	showLeaderboardContainer();
}

function showLeaderboardContainer() {
	let leaderboardContainer = document.getElementById(
		"main-menu-leaderboard-container"
	);
	let mainMenuContainer = document.getElementById("main-menu-container");
	mainMenuContainer.style.display = "none";
	leaderboardContainer.style.display = "flex";

	document
		.getElementById("show-leaderboard-button")
		.addEventListener("click", fetchLeaderboardDataInMainMenu);
	document
		.getElementById("main-menu-leaderboard-back-button")
		.addEventListener("click", showMainMenuContainer);
}

async function fetchLeaderboardDataInMainMenu() {
	let sessionToken = document.getElementById("leaderboard-session-input").value;
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
			displayLeaderboardResults(data.scores);
		} else {
			alert("Failed to fetch leaderboard: " + data.error);
		}
	} catch (error) {
		console.error("Error fetching leaderboard:", error);
		alert("An error occurred while trying to fetch the leaderboard.");
	}
}

function displayLeaderboardResults(scores) {
	let resultsContainer = document.getElementById(
		"main-menu-leaderboard-results-container"
	);
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
}

function handleLogoutButtonClick() {
	sessionStorage.removeItem("logged_in_user_id");
	sessionStorage.removeItem("current_city_index");
	sessionStorage.removeItem("game_session_id");
	sessionStorage.removeItem("game_session_token");
	sessionStorage.removeItem("score");
	sessionStorage.removeItem("cities");

	window.location.reload();
}

export {
	showMainMenuContainer,
	showGameModeSelectionContainer,
	handlePlayButtonClick,
	handleGameModeSelectionBackButtonClick,
	handleCreateNewGameButtonClick,
	handleJoinGameButtonClick,
	showLeaderboardContainer,
	handleLeaderboardButtonClick,
	handleLogoutButtonClick,
};
