import { useState, version } from "react";
import { Chess, WHITE } from "chess.js";
import { defaultSquareNotation } from "../../utils/js/utils";

import "./GameBoard.scss";

import Piece from "../Piece/Piece";
import Square from "../Square/Square";
import PromotionDialog from "../PromotionDialog/PromotionDialog";
import GameOverScreen from "../GameOverScreen/GameOverScreen";

//const chess = new Chess();

//gameOver testing
//const chess = new Chess("rnbqkbnr/pppppppp/8/8/2B5/5Q2/PPPPPPPP/RNB1K1NR w KQ - 0 1");

//promotion testing
const chess = new Chess("8/PPPPPPPP/8/2K5/5k2/8/pppppppp/8 w KQ - 0 1");

export default function GameBoard() {
  const [chessboard, setChessboard] = useState(chess.board());
  const [activeSquare, setActiveSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState(null);
  const [promotionDestination, setPromotionDestination] = useState({
    row: null,
    column: null
  });
  const [promotionDialogOpened, setPromotionDialogOpened] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function handleSelection(pieceObj) {
    setActiveSquare(pieceObj);
    setPossibleMoves(
      chess
        .moves({ square: pieceObj.square, verbose: true })
        .map(({ to }) => to)
    );
  }
  function handleMove(destination, promotionFigure) {
    chess.move({
      from: activeSquare.square,
      to: destination,
      promotion: promotionFigure
    });
    setPossibleMoves([]);
    setChessboard(chess.board());
    checkGameOver();
  }
  function handlePromotion(row, column) {
    setPromotionDestination({ row: row, column: column });
    setPromotionDialogOpened(true);
  }
  function handleDialogClosure() {
    setPromotionDialogOpened(false);
  }

  function checkGameOver() {
    if (chess.isGameOver()) {
      setGameOver(true);
    }
  }
  return (
    <div className='board-wrapper'>
      <div
        className={`side-marker-${chess.turn() === WHITE ? "white" : "black"}`}
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
                b
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
      {gameOver ? <GameOverScreen></GameOverScreen> : null}
    </div>
  );
}
