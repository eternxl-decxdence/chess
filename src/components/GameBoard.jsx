import { useState } from "react";
import { Chess } from "chess.js";
import "./GameBoard.scss";

import Piece from "./Piece";

const columnIndexes = ["a", "b", "c", "d", "e", "f", "g", "h"];
const chess = new Chess();

export default function GameBoard() {
  const [chessBoard, setChessboard] = useState(chess.board());

  return (
    <>
      <div className='board'>
        {chessBoard.map((boardRow, indexRow) => (
          <div key={indexRow} className='row-wrapper'>
            {boardRow.map((square, indexCol) => (
              <div
                key={`${columnIndexes[indexCol]}${indexRow}`}
                className={
                  (indexCol % 2 == 0 && indexRow % 2 == 0) ||
                  (indexCol % 2 != 0 && indexRow % 2 !== 0)
                    ? "square-light"
                    : "square-dark"
                }
              >
                {indexCol == 0 ? (
                  <span
                    className={
                      indexRow % 2 == 0
                        ? "coordinate-row-light"
                        : "coordinate-row-dark"
                    }
                  >
                    {(indexRow - 8) * -1}
                  </span>
                ) : null}
                {square != null ? (
                  <Piece data={square} chessboard={chessBoard} chess={chess} />
                ) : null}
                {indexRow == 7 ? (
                  <span
                    className={
                      indexCol % 2 == 0
                        ? "coordinate-col-dark"
                        : "coordinate-col-light"
                    }
                  >
                    {columnIndexes[indexCol]}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
