import { PAWN, KING, WHITE, BLACK } from "chess.js";
import Piece from "../Piece/Piece";
import "./Square.scss";
export default function Square({
  position,
  activeSquare,
  squareData,
  isPossibleMove,
  onSquareSelect,
  onPromotion,
  onMove,
  chess
}) {
  function handlePossibleMoveClick() {
    if (
      activeSquare.type == PAWN &&
      ((activeSquare.color == WHITE && position.row == 0) ||
        (activeSquare.color == BLACK && position.row == 7))
    ) {
      console.log(position);
      onPromotion(squareData.square, position);
    } else {
      onMove(squareData.square);
    }
  }

  return (
    <div
      onClick={squareData.type && (() => onSquareSelect(squareData))}
      className={`square${
        chess.inCheck() &&
        squareData.type == KING &&
        squareData.color == chess.turn()
          ? "-checked"
          : ""
      }`}
    >
      {squareData.type && <Piece pieceData={squareData} />}
      {isPossibleMove && (
        <div
          onClick={handlePossibleMoveClick}
          className={`possible-move${squareData.type ? "-attack" : ""}`}
        ></div>
      )}
    </div>
  );
}
