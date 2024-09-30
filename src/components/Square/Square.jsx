import "./Square.scss";
import {
  columnIndexes,
  defaultSquareNotation,
  returnCornerClass
} from "../../utils";
import { useState } from "react";

import PromotionDialog from "../PromotionDialog/PromotionDialog";
import { WHITE, BLACK, PAWN, KING } from "chess.js";

export default function Square({
  activeSquareData,
  squareData,
  children,
  row,
  column,
  chess,
  onPieceSelect,
  isPossibleMove,
  isLastMove,
  onPieceMove,
  onPromotion
}) {
  function handleSquareClick() {
    if (squareData != null && squareData.color === chess.turn()) {
      onPieceSelect(squareData);
    }
  }
  const squareClassName = `square ${
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
  }${
    chess.inCheck() &&
    squareData != null &&
    squareData.type == KING &&
    squareData.color == chess.turn()
      ? " checked"
      : ""
  }`;

  const rowCoordinate =
    row % 2 == 0 ? "coordinate-row-light" : "coordinate-row-dark";
  const columnCordinate =
    column % 2 == 0 ? "coordinate-col-dark" : "coordinate-col-light";
  const possibleMoveClassName = `possible-move${
    squareData != null ? "-attack" : "-empty"
  }`;

  function handlePossibleMoveClick(event) {
    if (
      activeSquareData.type == PAWN &&
      ((activeSquareData.color == WHITE && row == 0) ||
        (activeSquareData.color == BLACK && row == 7))
    ) {
      onPromotion(row, column);
    } else {
      onPieceMove(defaultSquareNotation(column, row));
    }
  }

  return (
    <div
      key={`${columnIndexes[column]}${row}`}
      className={squareClassName}
      onClick={handleSquareClick}
    >
      {column == 0 ? (
        <span className={rowCoordinate}>{(row - 8) * -1}</span>
      ) : null}

      {isPossibleMove ? (
        <div
          className={possibleMoveClassName}
          onClick={handlePossibleMoveClick}
        ></div>
      ) : null}

      {children}

      {row == 7 ? (
        <span className={columnCordinate}>{columnIndexes[column]}</span>
      ) : null}
    </div>
  );
}
