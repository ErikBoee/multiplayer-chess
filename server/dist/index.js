"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const views_1 = require("./views");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const wsInstance = (0, express_ws_1.default)(app);
const wsApp = wsInstance.app;
const jsonParser = body_parser_1.default.json();
wsApp.use((0, cors_1.default)());
wsApp.get("/get-suggestions/", jsonParser, views_1.getSuggestions);
wsApp.get("/get-current-game/", jsonParser, views_1.getGame);
wsApp.post("/new-game/", jsonParser, views_1.newGame);
wsApp.post("/add-suggestion/", jsonParser, views_1.addSuggestion);
wsApp.post("/make-move/", jsonParser, views_1.makeMove);
var aWss = wsInstance.getWss();
wsApp.ws("/", (ws, _req) => {
    ws.on("message", (msg) => {
        aWss.clients.forEach((client) => {
            client.send(msg.toString());
        });
    });
});
wsApp.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
