"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGame = getGame;
exports.getSuggestions = getSuggestions;
exports.newGame = newGame;
exports.makeMove = makeMove;
exports.addSuggestion = addSuggestion;
const prismaClient_1 = require("./db/prismaClient");
const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
function getGame(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newestGame = yield prismaClient_1.prisma.game.findFirst({
            orderBy: {
                createdAt: "desc",
            },
        });
        if (!newestGame) {
            res.status(404).send("No game found");
            return;
        }
        res.json({ fen: newestGame.fen });
    });
}
function getSuggestions(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newestGame = yield prismaClient_1.prisma.game.findFirst({
            orderBy: {
                createdAt: "desc",
            },
        });
        if (!newestGame) {
            res.status(404).send("No game found");
            return;
        }
        const newestMove = yield prismaClient_1.prisma.move.findFirst({
            where: {
                gameId: newestGame.id,
            },
            orderBy: {
                index: "desc",
            },
        });
        if (!newestMove) {
            res.status(404).send("No move found");
            return;
        }
        const suggestions = yield prismaClient_1.prisma.suggestion.findMany({
            where: {
                moveId: newestMove.id,
            },
        });
        const suggestionsRecord = {};
        suggestions.forEach((suggestion) => {
            suggestionsRecord[suggestion.suggestedMove] = suggestion.numberOfVotes;
        });
        res.json({ suggestions: suggestionsRecord });
    });
}
function newGame(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdGame = yield prismaClient_1.prisma.game.create({
            data: {
                fen: startingFen,
            },
        });
        yield prismaClient_1.prisma.move.create({
            data: {
                gameId: createdGame.id,
                moveDescription: "",
                index: 0,
            },
        });
        res.send();
    });
}
function makeMove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newestGame = yield prismaClient_1.prisma.game.findFirst({
            orderBy: {
                createdAt: "desc",
            },
        });
        if (!newestGame) {
            res.status(404).send("No game found");
            return;
        }
        yield prismaClient_1.prisma.game.update({
            where: {
                id: newestGame.id,
            },
            data: {
                fen: req.body.newFen,
            },
        });
        const newestMove = yield prismaClient_1.prisma.move.findFirst({
            where: {
                gameId: newestGame.id,
            },
            orderBy: {
                index: "desc",
            },
        });
        if (!newestMove) {
            res.status(404).send("No move found");
            return;
        }
        yield prismaClient_1.prisma.move.update({
            where: {
                id: newestMove.id,
            },
            data: {
                moveDescription: req.body.move,
            },
        });
        yield prismaClient_1.prisma.move.create({
            data: {
                gameId: newestGame.id,
                moveDescription: "",
                index: newestMove.index + 1,
            },
        });
        res.send();
    });
}
function addSuggestion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newestGame = yield prismaClient_1.prisma.game.findFirst({
            orderBy: {
                createdAt: "desc",
            },
        });
        if (!newestGame) {
            res.status(404).send("No game found");
            return;
        }
        const newestMove = yield prismaClient_1.prisma.move.findFirst({
            where: {
                gameId: newestGame.id,
            },
            orderBy: {
                index: "desc",
            },
        });
        if (!newestMove) {
            res.status(404).send("No move found");
            return;
        }
        const suggestion = yield prismaClient_1.prisma.suggestion.findFirst({
            where: {
                moveId: newestMove.id,
                suggestedMove: req.body.move,
            },
        });
        if (suggestion) {
            yield prismaClient_1.prisma.suggestion.update({
                where: {
                    id: suggestion.id,
                },
                data: {
                    numberOfVotes: suggestion.numberOfVotes + 1,
                },
            });
        }
        else {
            yield prismaClient_1.prisma.suggestion.create({
                data: {
                    moveId: newestMove.id,
                    suggestedMove: req.body.move,
                    numberOfVotes: 1,
                },
            });
        }
        res.send();
    });
}
