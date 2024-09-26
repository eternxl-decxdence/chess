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
  function returnCornerClass(row, col) {
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
  return (
    <div
      key={`${columnIndexes[column]}${row}`}
      className={`square ${
        (column % 2 == 0 && row % 2 == 0) || (column % 2 != 0 && row % 2 !== 0)
          ? "square-light"
          : "square-dark"
      }${isLastMove ? " last-move" : ""}${
        isPossibleMove && squareData != null ? " attack" : ""
      }${
        (row == 0 && column == 0) ||
        (row == 0 && column == 7) ||
        (row == 7 && column == 0) ||
        (row == 7 && column == 7)
          ? " corner-" + returnCornerClass(row, column)
          : ""
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
