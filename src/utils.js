import {
  PAWN,
  ROOK,
  KNIGHT,
  BISHOP,
  QUEEN,
  KING,
  BLACK,
  WHITE
} from "chess.js";

export function returnPieceIconName(pieceObj) {
  let iconId = "icon-";
  if (pieceObj.type == PAWN) {
    iconId += "pawn-";
  } else if (pieceObj.type == QUEEN) {
    iconId += "queen-";
  } else if (pieceObj.type == KING) {
    iconId += "king-";
  } else if (pieceObj.type == ROOK) {
    iconId += "rook-";
  } else if (pieceObj.type == KNIGHT) {
    iconId += "knight-";
  } else if (pieceObj.type == BISHOP) {
    iconId += "bishop-";
  }
  if (pieceObj.color == WHITE) {
    iconId += "white";
  } else if (pieceObj.color == BLACK) {
    iconId += "black";
  }
  return iconId;
}
export function defaultSquareNotation(column, row) {
  return `${columnIndexes[column]}${(row - 8) * -1}`;
}
export const columnIndexes = ["a", "b", "c", "d", "e", "f", "g", "h"];

export function returnCornerClass(row, col) {
  if (row == 0 && col == 0) {
    return "top-left";
  } else if (row == 0 && col == 7) {
    return "top-right";
  } else if (row == 7 && col == 0) {
    return "bottom-left";
  } else if (row == 7 && col == 7) {
    return "bottom-right";
  }
}
