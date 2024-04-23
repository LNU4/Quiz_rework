import { showMainMenuContainer } from "./main-menu.js";

function showLoginContainer() {
	let loginContainer = document.getElementById("login-container");
	let registerContainer = document.getElementById("register-container");
	let mainMenuContainer = document.getElementById("main-menu-container");
	let gameContainer = document.getElementById("game-container");

	loginContainer.style.display = "flex";
	registerContainer.style.display = "flex";
	mainMenuContainer.style.display = "none";
	gameContainer.style.display = "none";
}

function showLoginFormMsg(msg) {
	let loginFormMsg = document.getElementById("login-form-msg");
	loginFormMsg.style.display = "block";
	loginFormMsg.textContent = msg;
	setTimeout(() => {
		loginFormMsg.style.display = "none";
	}, 3000);
}

async function handleLogin(e) {
	e.preventDefault();
	let username = document.getElementById("login-username").value;
	let password = document.getElementById("login-password").value;

	try {
		let response = await fetch("http://localhost:3000/api/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		let data = await response.json();

		if (data.success) {
			sessionStorage.setItem("logged_in_user_id", data.userId);
			showMainMenuContainer();
		} else {
			showLoginFormMsg(
				"Error, could not login. Check your username and password and try again"
			);
		}
	} catch (error) {
		console.error("Login error:", error);
		alert("An error occurred during login. Please try again.");
	}
}

function showRegisterContainer() {
	let registerContainer = document.getElementById("register-container");
	registerContainer.style.display = "flex";
}

function showRegisterFormMsg(msg) {
	let registerFormMsg = document.getElementById("register-form-msg");
	registerFormMsg.style.display = "block";
	registerFormMsg.textContent = msg;
	setTimeout(() => {
		registerFormMsg.style.display = "none";
	}, 3000);
}

async function handleRegister(e) {
	e.preventDefault();
	let username = document.getElementById("register-username").value;
	let password = document.getElementById("register-password").value;

	try {
		let response = await fetch("http://localhost:3000/api/user/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		let data = await response.json();

		if (data.success) {
			console.log("Created new user with ID:", data.userId);
			showRegisterFormMsg("Created new user.");
		} else {
			showRegisterFormMsg("Error, could not register user.");
		}
	} catch (error) {
		console.error("Registration error:", error);
		showRegisterFormMsg("Registration error: " + error.message);
	}
}

export {
	showLoginContainer,
	handleLogin,
	showRegisterContainer,
	handleRegister,
};
