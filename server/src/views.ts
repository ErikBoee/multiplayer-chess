import { TypedRequestBody, TypedResponse } from "./helpers/http";
import { prisma } from "./db/prismaClient";
import { Response } from "express";
import jwt from "jsonwebtoken";

const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export async function getGame(
  _req: TypedRequestBody<{}>,
  res: TypedResponse<{ fen: string }>
) {
  const newestGame = await prisma.game.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!newestGame) {
    res.status(404).send("No game found");
    return;
  }
  res.json({ fen: newestGame.fen });
}

export async function getGamePgn(
  _req: TypedRequestBody<{}>,
  res: TypedResponse<{ pgn: string }>
) {
  const newestGame = await prisma.game.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!newestGame) {
    res.status(404).send("No game found");
    return;
  }
  const moves = await prisma.move.findMany({
    where: {
      gameId: newestGame.id,
    },
    orderBy: {
      index: "asc",
    },
  });
  const pgn = moves
    .map((move) => {
      if (move.index % 2 === 0) {
        return `${Math.floor(move.index / 2) + 1}. ${move.moveDescription}`;
      }
      return move.moveDescription;
    })
    .join(" ");
  res.json({ pgn });
}

export async function getSuggestions(
  _req: TypedRequestBody<{}>,
  res: TypedResponse<{
    suggestions: Record<string, number>;
  }>
) {
  const newestGame = await prisma.game.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!newestGame) {
    res.status(404).send("No game found");
    return;
  }
  const newestMove = await prisma.move.findFirst({
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
  const suggestions = await prisma.suggestion.findMany({
    where: {
      moveId: newestMove.id,
    },
  });

  const suggestionsRecord: Record<string, number> = {};
  suggestions.forEach((suggestion) => {
    suggestionsRecord[suggestion.suggestedMove] = suggestion.numberOfVotes;
  });
  res.json({ suggestions: suggestionsRecord });
}

export async function newGame(_req: TypedRequestBody<{}>, res: Response) {
  const createdGame = await prisma.game.create({
    data: {
      fen: startingFen,
    },
  });
  await prisma.move.create({
    data: {
      gameId: createdGame.id,
      moveDescription: "",
      index: 0,
    },
  });
  res.send();
}

export async function makeMove(
  req: TypedRequestBody<{ move: string; newFen: string }>,
  res: Response
) {
  const newestGame = await prisma.game.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!newestGame) {
    res.status(404).send("No game found");
    return;
  }
  await prisma.game.update({
    where: {
      id: newestGame.id,
    },
    data: {
      fen: req.body.newFen,
    },
  });
  const newestMove = await prisma.move.findFirst({
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
  await prisma.move.update({
    where: {
      id: newestMove.id,
    },
    data: {
      moveDescription: req.body.move,
    },
  });
  await prisma.move.create({
    data: {
      gameId: newestGame.id,
      moveDescription: "",
      index: newestMove.index + 1,
    },
  });
  res.send();
}

export async function addSuggestion(
  req: TypedRequestBody<{ move: string }>,
  res: Response
) {
  const newestGame = await prisma.game.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!newestGame) {
    res.status(404).send("No game found");
    return;
  }
  const newestMove = await prisma.move.findFirst({
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
  const suggestion = await prisma.suggestion.findFirst({
    where: {
      moveId: newestMove.id,
      suggestedMove: req.body.move,
    },
  });
  if (suggestion) {
    await prisma.suggestion.update({
      where: {
        id: suggestion.id,
      },
      data: {
        numberOfVotes: suggestion.numberOfVotes + 1,
      },
    });
  } else {
    await prisma.suggestion.create({
      data: {
        moveId: newestMove.id,
        suggestedMove: req.body.move,
        numberOfVotes: 1,
      },
    });
  }
  res.send();
}

export async function login(
  req: TypedRequestBody<{ email: string; password: string }>,
  res: TypedResponse<{ token: string }>
) {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  });
  if (!user) {
    res.status(401).send("Invalid username or password");
    return;
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log("JWT secret not set");
    res.status(500).send("Internal server error");
    return;
  }
  const token = jwt.sign({ id: user.id }, secret);
  res.status(200).json({ token });
  return;
}
