import { Chess } from "chess.js";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import Piece from "../Piece/Piece";

import "./GameBoard.scss";
import "./Coordinates.scss";
const chess = new Chess();

export default function GameBoard() {
  const [chessboard, setChessboard] = useState(chess.board());

  function onSquareSelection(square) {}
  function onMove(from, to) {}

  return (
    <DndContext>
      <div className='board'>
        {chessboard.map((row, rowIndex) =>
          row.map((square, colIndex) => (
            <div key={`${colIndex}${rowIndex}`} className='square'>
              {square && <Piece pieceData={square} />}
            </div>
          ))
        )}
      </div>
    </DndContext>
  );
}
