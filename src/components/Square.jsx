import "./Square.scss";
import { columnIndexes } from "../utils";
import { Chess } from "chess.js";

export default function Square({
  squareData,
  children,
  row,
  column,
  chess,
  onPieceSelect,
  isMovable,
  isPossibleMove,
  onPieceMove
}) {
  return (
    <div
      key={`${columnIndexes[column]}${row}`}
      className={`square ${
        (column % 2 == 0 && row % 2 == 0) || (column % 2 != 0 && row % 2 !== 0)
          ? "square-light"
          : "square-dark"
      }`} 
      onClick={squareData != null ? () => onPieceSelect(squareData.square) : null}
    >
      {column == 0 ? (
        <span
          className={
            row % 2 == 0 ? "coordinate-row-light" : "coordinate-row-dark"
          }
        >
          {(row - 8) * -1}
        </span>
      ) : null}
      {isPossibleMove ? <div className={`possible-move ${isPossibleMove? 'movable' : null}`} onClick={isPossibleMove ? () => onPieceMove(`${columnIndexes[column]}${(row-8)* -1}`) : null}></div> : null}
      {children}
      {row == 7 ? (
        <span
          className={
            column % 2 == 0 ? "coordinate-col-dark" : "coordinate-col-light"
          }
        >
          {columnIndexes[column]}
        </span>
      ) : null}
    </div>
  );
}
