import { PAWN, ROOK, KNIGHT, BISHOP, QUEEN, KING } from "chess.js";

export function returnPieceIconName(pieceObj) {
  let iconId = "icon-";
  if (pieceObj.type == PAWN) {
    iconId += "pawn";
  } else if (pieceObj.type == QUEEN) {
    iconId += "queen";
  } else if (pieceObj.type == KING) {
    iconId += "king";
  } else if (pieceObj.type == ROOK) {
    iconId += "rook";
  } else if (pieceObj.type == KNIGHT) {
    iconId += "knight";
  } else if (pieceObj.type == BISHOP) {
    iconId += "bishop";
  }
  return iconId;
}
export function defaultSquareNotation(column, row) {
  return `${columnIndexes[column]}${(row - 8) * -1}`;
}
export const columnIndexes = ["a", "b", "c", "d", "e", "f", "g", "h"];
