import { useState, version } from "react";
import { Chess } from "chess.js";
import {
  deconstructDefaultSquareNotation,
  defaultSquareNotation
} from "../../utils";

import "./GameBoard.scss";

import Piece from "../Piece/Piece";
import Square from "../Square/Square";
import PromotionDialog from "../PromotionDialog/PromotionDialog";
//  promotion testing
const chess = new Chess("8/PPPPPPPP/8/5k1P/p1K5/8/pppppppp/8 w - - 0 1");
// const chess = new Chess();

export default function GameBoard() {
  const [chessboard, setChessboard] = useState(chess.board());
  const [activeSquare, setActiveSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState(null);
  const [promotionDestination, setPromotionDestination] = useState({row: null, column: null});
  const [promotionDialogOpened, setPromotionDialogOpened] = useState(false);

  function handleSelection(pieceObj) {
    setActiveSquare(pieceObj);
    console.log(activeSquare);
    setPossibleMoves(
      chess
        .moves({ square: pieceObj.square, verbose: true })
        .map(({ to }) => to)
    );
  }

  function handleMove(destination, promotionFigure) {
    console.log(activeSquare);
    console.log(destination);
    chess.move({
      from: activeSquare.square,
      to: destination,
      promotion: promotionFigure
    });
    setPossibleMoves([]);
    setChessboard(chess.board());
  }
  function handlePromotion(row, column) {
    setPromotionDestination({row: row, column: column});
    setPromotionDialogOpened(true);
  }
  function handleDialogClosure() {
    setPromotionDialogOpened(false);
  }

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
                activeSquareData={activeSquare}
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
                onPromotion={handlePromotion}
              >
                {square != null ? <Piece data={square} /> : null}
              </Square>
            ))}
          </div>
        ))}
        {promotionDialogOpened ? (
          <PromotionDialog
            sideToMove={chess.turn()}
            column={promotionDestination.column}
            row={promotionDestination.row}
            onPromotionSelect={handleMove}
            onClose={handleDialogClosure}
          />
        ) : null}
      </div>
    </div>
  );
}
