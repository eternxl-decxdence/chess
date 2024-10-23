import { PAWN, WHITE, BLACK } from "chess.js";
import Piece from "../Piece/Piece";
import "./Square.scss";
export default function Square({
  position,
  squareData, 
  isPossibleMove, 
  onSquareSelect,
  onPromotion,
  onMove}) {
  const possibleMoveClick = 
    (squareData == {type: PAWN, color: WHITE} && position.row == 0) ||
    (squareData == {type: PAWN, color: BLACK} && position.row == 7) ?
      ( () => onPromotion(squareData.square)) :
      ( () => onMove(squareData.square))
  return (
    <div 
      onClick={squareData && (() => onSquareSelect(squareData))}
      className='square'>
        {squareData.type && <Piece pieceData={squareData} />}
        {isPossibleMove && 
          <div onClick={possibleMoveClick}
          className={`possible-move${squareData.type ? '-attack' : ""}`}></div>}
    </div>
  )
}