import "./Square.scss";
import { columnIndexes, defaultSquareNotation } from "../utils";

export default function Square({
  squareData,
  children,
  row,
  column,
  chess,
  onPieceSelect,
  isPossibleMove,
  isLastMove,
  onPieceMove
}) {
  return (
    <div
      key={`${columnIndexes[column]}${row}`}
      className={`square ${
        (column % 2 == 0 && row % 2 == 0) || (column % 2 != 0 && row % 2 !== 0)
          ? "square-light"
          : "square-dark"
      } ${isLastMove ? "last-move" : ""} ${
        isPossibleMove && squareData != null ? "attack" : ""
      }`}
      onClick={
        squareData != null && squareData.color === chess.turn()
          ? () => onPieceSelect(squareData.square)
          : squareData != null &&
            squareData.color !== chess.turn() &&
            isPossibleMove
          ? () => onPieceMove(defaultSquareNotation(column, row), squareData)
          : null
      }
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

      {isPossibleMove ? (
        <div
          className={`possible-move${
            squareData != null ? "-attack" : "-empty"
          }`}
          onClick={
            isPossibleMove
              ? () =>
                  onPieceMove(defaultSquareNotation(column, row), squareData)
              : null
          }
        ></div>
      ) : null}
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
