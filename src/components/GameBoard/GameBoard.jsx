import { Chess } from "chess.js";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { defaultSquareNotation } from "../../utils/js/utils";
import { PAWN, WHITE, BLACK } from "chess.js";
import "./GameBoard.scss";
import "./Coordinates.scss";
import Square from "../Square/Square";
import PromotionDialog from "../PromotionDialog/PromotionDialog";

const chess = new Chess();

//const chess = new Chess("1K6/PPPPPPPP/8/8/8/8/pppppppp/6k1 w - - 0 1");

export default function GameBoard() {
  const [chessboard, setChessboard] = useState(chess.board());
  const [activeSquare, setActiveSquare] = useState(null);
  const [promotion, setPromotion] = useState({
    active: false,
    moveTo: null,
    dialogPosition: { col: null, row: null }
  });

  function handleDragStart(event) {
    onSquareSelection(event.active.data.current);
    console.log(event);
  }
  function handleDragEnd(event) {
    console.log(event);
    if (
      chess
        .moves({ square: activeSquare.square, verbose: true })
        .map(({ to }) => to)
        .includes(event.over.id)
    ) {
      onMove(event.over.id, event.over.data.current);
    }
  }

  function onSquareSelection(square) {
    if (square.color === chess.turn()) {
      setActiveSquare(square);
    }
  }

  function onMove(to, position) {
    if (
      activeSquare.type == PAWN &&
      ((activeSquare.color == WHITE && position.row == 0) ||
        (activeSquare.color == BLACK && position.row == 7))
    ) {
      onPromotion(to, position);
    } else {
      chess.move({ from: activeSquare.square, to: to });
      setChessboard(chess.board());
      setActiveSquare(null);
    }
  }

  function onPromotion(to, position) {
    setPromotion({ active: true, moveTo: to, dialogPosition: position });
  }

  function promoteMove(to, pieceType) {
    chess.move({ from: activeSquare.square, to: to, promotion: pieceType });
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
