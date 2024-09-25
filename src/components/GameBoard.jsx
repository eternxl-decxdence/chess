import { useState } from "react";
import { Chess } from "chess.js";
import { columnIndexes } from "../utils";
import "./GameBoard.scss";

import Piece from "./Piece";
import Square from "./Square";

const chess = new Chess();

export default function GameBoard() {
  const [chessboard, setChessboard] = useState(chess.board());
  const [activeSquare, setActiveSquare] = useState();
  function showPossibleMoves(position) {
    return chess.moves({ square: position });
  }
  function movePiece(from, to) {}
  return (
    <>
      <div className='board'>
        {chessboard.map((boardRow, indexRow) => (
          <div key={indexRow} className='row-wrapper'>
            {boardRow.map((square, indexCol) => (
              <Square
                key={`${columnIndexes[indexCol]}${indexRow}`}
                squareData={square}
                row={indexRow}
                column={indexCol}
                chess={chess}
                onPieceSelect={showPossibleMoves}
                onPieceMove={movePiece}
              >
                {square != null ? <Piece data={square} /> : null}
              </Square>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
