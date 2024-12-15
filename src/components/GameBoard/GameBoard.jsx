import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { defaultSquareNotation } from "../../utils/js/utils";
import { PAWN, WHITE, BLACK } from "chess.js";

import "./GameBoard.scss";
import "./Coordinates.scss";
import Square from "../Square/Square";
import PromotionDialog from "../PromotionDialog/PromotionDialog";

export default function GameBoard({
  chess,
  onGameOver,
  onPieceCapture,
  onFirstMove,
  onSideChange,
  onHistoryUpdate
}) {
  const [chessboard, setChessboard] = useState(chess.board());
  const [activeSquare, setActiveSquare] = useState(null);
  const [lastMoves, setLastMoves] = useState([]);
  const [promotion, setPromotion] = useState({
    active: false,
    moveTo: null,
    dialogPosition: { col: null, row: null }
  });

  function handleDragStart(event) {
    const { active } = event;
    if (active.data.current.color === chess.turn()) {
      onSquareSelection(active.data.current);
    }
  }

  function updateHistory() {
    let result = [];
    const history = chess.history();
    for (let i = 0; i < history.length; i += 2) {
      result.push({ white: history[i], black: history[i + 1] });
    }
    onHistoryUpdate(result);
  }

  function handleDragEnd(event) {
    if (activeSquare != null) {
      if (
        chess
          .moves({ square: activeSquare.square, verbose: true })
          .map(({ to }) => to)
          .includes(event.over.id)
      ) {
        onMove(event.over.id, event.over.data.current);
      }
    }
  }

  function onSquareSelection(square) {
    if (square.color === chess.turn()) {
      setActiveSquare(square);
    }
  }

  function onMove(to, position) {
    if (chess.history.length == 0) {
      onFirstMove();
    }
    if (
      activeSquare.type == PAWN &&
      ((activeSquare.color == WHITE && position.row == 0) ||
        (activeSquare.color == BLACK && position.row == 7))
    ) {
      onPromotion(to, position);
    } else {
      chess.move({ from: activeSquare.square, to: to });
      updateHistory();
      onSideChange(chess.turn());
      checkCapture();
      checkGameOver();
      setLastMoves([activeSquare.square, to]);
      setChessboard(chess.board());
      setActiveSquare(null);
    }
  }

  function onPromotion(to, position) {
    setPromotion({ active: true, moveTo: to, dialogPosition: position });
  }

  function promoteMove(to, pieceType) {
    chess.move({ from: activeSquare.square, to: to, promotion: pieceType });
    updateHistory();
    onSideChange(chess.turn());
    checkCapture();
    checkGameOver();
    setLastMoves([activeSquare.square, to]);
    handleDialogClosure();
    setChessboard(chess.board());
    setActiveSquare(null);
  }
  function handleDialogClosure() {
    setPromotion({
      active: false,
      moveTo: null,
      dialogPosition: { col: null, row: null }
    });
  }

  function checkGameOver() {
    if (chess.isCheckmate()) {
      setTimeout(() => onGameOver("Checkmate"), 1000);
    } else if (chess.isStalemate()) {
      setTimeout(() => onGameOver("Stalemate"), 1000);
    } else if (chess.isInsufficientMaterial()) {
      setTimeout(() => onGameOver("Insufficient Material"), 1000);
    } else if (chess.isThreefoldRepetition()) {
      setTimeout(() => onGameOver("Threefold Repetition"), 1000);
    } else if (chess.isDraw()) {
      setTimeout(() => onGameOver("Draw"), 1000);
    } else {
    }
  }
  function checkCapture() {
    let moves = chess.history({ verbose: true });
    let lastMove = moves[moves.length - 1];
    if (lastMove.captured) {
      onPieceCapture(lastMove.captured, chess.turn() == WHITE ? BLACK : WHITE);
    }
  }
  return (
    <div className='board'>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {chessboard.map((row, rowIndex) =>
          row.map((square, colIndex) => (
            <Square
              chess={chess}
              position={{ col: colIndex, row: rowIndex }}
              key={`${colIndex}${rowIndex}`}
              squareData={
                square
                  ? square
                  : { square: defaultSquareNotation(colIndex, rowIndex) }
              }
              isPossibleMove={
                activeSquare !== null &&
                chess
                  .moves({ square: activeSquare.square, verbose: true })
                  .map(({ to }) => to)
                  .includes(defaultSquareNotation(colIndex, rowIndex))
              }
              isLastMove={lastMoves.includes(
                defaultSquareNotation(colIndex, rowIndex)
              )}
              onSquareSelect={onSquareSelection}
              onMove={onMove}
            />
          ))
        )}
      </DndContext>
      {promotion.active && (
        <PromotionDialog
          activeSquare={activeSquare}
          moveTo={promotion.moveTo}
          dialogPosition={promotion.dialogPosition}
          onPromotion={promoteMove}
          onClose={handleDialogClosure}
        />
      )}
    </div>
  );
}
