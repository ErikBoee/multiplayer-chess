import { Chess } from "chess.js";

export function clone(instance: Chess): Chess {
  const copy = new Chess();
  Object.assign(copy, instance);
  return copy;
}
