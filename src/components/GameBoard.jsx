import { useState } from "react";
import { Chess } from "chess.js";
import { columnIndexes } from "../utils";
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
    setPossibleMoves(chess.moves({square: position, verbose: true}).map(({to}) => to));
  }
  const handleMove = (destination) => {
    chess.move({from: activeSquare, to: destination});
    setPossibleMoves([]);
    setChessboard(chess.board());
  }

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
                
                onPieceSelect={handleSelection}
                isMovable={square != null && square.square == activeSquare ? true : false }
                isPossibleMove={possibleMoves != null && possibleMoves.includes(`${columnIndexes[indexCol]}${(indexRow - 8) * -1}`)}
                onPieceMove={handleMove}
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
