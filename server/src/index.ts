// src/index.js
import express, { Express } from "express";
import expressWs from "express-ws";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { authenticateRequest } from "./helpers/auth";
import cors from "cors";
import {
  addSuggestion,
  getGame,
  getGamePgn,
  getSuggestions,
  login,
  makeMove,
  newGame,
} from "./views";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const wsInstance = expressWs(app);
const wsApp = wsInstance.app;

const jsonParser = bodyParser.json();

wsApp.use(cors());

wsApp.get("/get-suggestions/", jsonParser, getSuggestions);
wsApp.get("/get-current-game/", getGame);
wsApp.get("/get-current-game-pgn/", getGamePgn);
wsApp.post("/new-game/", authenticateRequest, jsonParser, newGame);
wsApp.post("/add-suggestion/", jsonParser, addSuggestion);
wsApp.post("/make-move/", authenticateRequest, jsonParser, makeMove);
wsApp.post("/login/", jsonParser, login);

var aWss = wsInstance.getWss();

wsApp.ws("/", (ws, _req) => {
  ws.on("message", (msg) => {
    aWss.clients.forEach((client) => {
      client.send(msg.toString());
    });
  });
});

wsApp.listen(port, () => {
  console.log(`[server]: Server is listening at ${port}`);
});
