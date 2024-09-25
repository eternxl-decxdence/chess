export function returnPieceIconName(pieceObj) {
  let iconId = "icon-";
  if (pieceObj.type == "p") {
    iconId += "pawn-";
  } else if (pieceObj.type == "q") {
    iconId += "queen-";
  } else if (pieceObj.type == "k") {
    iconId += "king-";
  } else if (pieceObj.type == "r") {
    iconId += "rook-";
  } else if (pieceObj.type == "n") {
    iconId += "knight-";
  } else if (pieceObj.type == "b") {
    iconId += "bishop-";
  }
  if (pieceObj.color == "w") {
    iconId += "white";
  } else if (pieceObj.color == "b") {
    iconId += "black";
  }
  return iconId;
}
export const columnIndexes = ["a", "b", "c", "d", "e", "f", "g", "h"];
