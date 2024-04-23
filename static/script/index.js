import {
	showLoginContainer,
	handleLogin,
	showRegisterContainer,
	handleRegister,
} from "./login.js";
import {
	showMainMenuContainer,
	handlePlayButtonClick,
	handleGameModeSelectionBackButtonClick,
	handleCreateNewGameButtonClick,
	handleJoinGameButtonClick,
	handleLeaderboardButtonClick,
	handleLogoutButtonClick,
} from "./main-menu.js";
import { showGameContainer, submitGuess } from "./game.js";

function init() {
	initLoginContainer();
	initRegisterContainer();
	initMainMenuContainer();
	initMainMenuGameModeSelection();
	initGameContainer();

	if (sessionStorage.getItem("logged_in_user_id")) {
		showMainMenuContainer();
	} else {
		showLoginContainer();
		showRegisterContainer();
	}
}

function initLoginContainer() {
	let loginContainer = document.getElementById("login-container");

	let loginForm = document.getElementById("login-form");
	loginForm.addEventListener("submit", handleLogin);
}

function initRegisterContainer() {
	let registerContainer = document.getElementById("register-container");

	let registerForm = document.getElementById("register-form");
	registerForm.addEventListener("submit", handleRegister);
}

function initMainMenuContainer() {
	let mainMenuPlayButton = document.getElementById("main-menu-play-button");
	mainMenuPlayButton = mainMenuPlayButton.addEventListener(
		"click",
		handlePlayButtonClick
	);

	let mainMenuLeaderboardButton = document.getElementById(
		"main-menu-leaderboard-button"
	);
	mainMenuLeaderboardButton.addEventListener(
		"click",
		handleLeaderboardButtonClick
	);

	let mainMenuLogoutButton = document.getElementById("main-menu-logout-button");
	mainMenuLogoutButton.addEventListener("click", handleLogoutButtonClick);
}

function initMainMenuGameModeSelection() {
	let mainMenuGameModeSelectionCreateNewGameButton = document.getElementById(
		"main-menu-game-mode-selection-create-new-game-button"
	);

	mainMenuGameModeSelectionCreateNewGameButton.addEventListener(
		"click",
		handleCreateNewGameButtonClick
	);

	let mainMenuGameModeSelectionJoinGameButton = document.getElementById(
		"main-menu-game-mode-selection-join-game-button"
	);

	mainMenuGameModeSelectionJoinGameButton.addEventListener(
		"click",
		handleJoinGameButtonClick
	);

	let mainMenuGameModeSelectionBackButton = document.getElementById(
		"main-menu-game-mode-selection-back-button"
	);
	mainMenuGameModeSelectionBackButton.addEventListener(
		"click",
		handleGameModeSelectionBackButtonClick
	);
}

function initGameContainer() {
	let gameContainerButton = document.getElementById(
		"game-container-submit-guess-button"
	);
	gameContainerButton.addEventListener("click", () => {
		submitGuess();
	});
}

document.addEventListener("DOMContentLoaded", init);
