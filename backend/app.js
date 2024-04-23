import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

import gameRouter from "./routes/game.js";
import mainMenuRouter from "./routes/main-menu.js";
import userRouter from "./routes/user.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'static')));

app.use(cors());
app.use(express.json());

app.use("/api/game", gameRouter);
app.use("/api/menu", mainMenuRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
	console.log(`app listening on port ${PORT}`);
});
