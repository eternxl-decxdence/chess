import { useState, version } from "react";
import { Chess } from "chess.js";
import { defaultSquareNotation } from "../utils";
import "./GameBoard.scss";

import Piece from "./Piece";
import Square from "./Square";

const chess = new Chess();

export default function GameBoard() {
  const [chessboard, setChessboard] = useState(chess.board());
  const [activeSquare, setActiveSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState();

  const handleSelection = (position) => {
    setActiveSquare(position);
    setPossibleMoves(
      chess.moves({ square: position, verbose: true }).map(({ to }) => to)
    );
  };
  const handleMove = (destination, square) => {
    chess.move({ from: activeSquare, to: destination });
    setPossibleMoves([]);
    setChessboard(chess.board());
    chess.isGameOver();
    chess.isThreefoldRepetition();
    chess.isStalemate();
    chess.isInsufficientMaterial();
  };

  return (
    <div className='board-wrapper'>
      <div
        className={`side-marker-${chess.turn() === "w" ? "white" : "black"}`}
      ></div>
      <div className='board'>
        {chessboard.map((boardRow, indexRow) => (
          <div key={indexRow} className='row-wrapper'>
            {boardRow.map((square, indexCol) => (
              <Square
                key={defaultSquareNotation(indexCol, indexRow)}
                squareData={square}
                row={indexRow}
                column={indexCol}
                chess={chess}
                isPossibleMove={
                  possibleMoves != null &&
                  possibleMoves.includes(
                    defaultSquareNotation(indexCol, indexRow)
                  )
                }
                isLastMove={
                  chess.history().length > 0 &&
                  (chess.history({ verbose: true })[chess.history().length - 1]
                    .from == defaultSquareNotation(indexCol, indexRow) ||
                    chess.history({ verbose: true })[chess.history().length - 1]
                      .to == defaultSquareNotation(indexCol, indexRow))
                }
                onPieceSelect={handleSelection}
                onPieceMove={handleMove}
              >
                {square != null ? <Piece data={square} /> : null}
              </Square>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
