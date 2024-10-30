import {KING} from "chess.js";
import {useDroppable} from "@dnd-kit/core";
import Piece from "../Piece/Piece";
import "./Square.scss";
export default function Square({
  position,
  squareData,
  isPossibleMove,
  onSquareSelect,
  onMove,
  chess
}) {
  const {setNodeRef} = useDroppable({
    id: squareData.square,
    data: position
  })
  function handlePossibleMoveClick() {
    onMove(squareData.square, position);
  }


  return (
    <div
      ref={setNodeRef}
      onClick={squareData.type && (() => onSquareSelect(squareData))}
      className={`square${
        chess.inCheck() &&
        squareData.type == KING &&
        squareData.color == chess.turn()
          ? "-checked"
          : ""
      }`}
    >
      {squareData.type && 
        <Piece draggable={true} pieceData={squareData} />}
      {isPossibleMove && (
        <div
          onClick={handlePossibleMoveClick}
          className={`possible-move${squareData.type ? "-attack" : ""}`}
        ></div>
      )}
    </div>
  );
}
