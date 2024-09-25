import "./Square.scss";
import { columnIndexes } from "../utils";
import { Chess } from "chess.js";

export default function Square({
  squareData,
  children,
  row,
  column,
  chess,
  showPossibleMoves
}) {
  return (
    <div
      key={`${columnIndexes[column]}${row}`}
      className={`square ${
        (column % 2 == 0 && row % 2 == 0) || (column % 2 != 0 && row % 2 !== 0)
          ? "square-light"
          : "square-dark"
      }`}
      onClick={() => showPossibleMoves(squareData.Square)}
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
