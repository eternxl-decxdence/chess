import { useState } from "react";
import { Chess } from "chess.js";
import "./GameBoard.scss";

import Piece from "./Piece";

const indexColes = ["a", "b", "c", "d", "e", "f", "g", "h"];
const chess = new Chess();

export default function GameBoard() {
  const [chessBoard, updateChessboard] = useState(chess.board());

  return (
    <>
      <div className='board'>
        {chessBoard.map((boardCol, indexCol) => (
          <div key={indexCol}>
            {boardCol.map((square, indexRow) => (
              <div
                key={indexRow}
                className={
                  (indexRow % 2 == 0 && indexCol % 2 == 0) ||
                  (indexRow % 2 != 0 && indexCol % 2 !== 0)
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
                <Piece data={square} />
                {indexRow == 7 ? (
                  <span
                    className={
                      indexCol % 2 == 0
                        ? "coordinate-col-dark"
                        : "coordinate-col-light"
                    }
                  >
                    {indexColes[indexCol]}
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
