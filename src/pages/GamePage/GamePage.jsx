import Header from "../../components/Header/Header";
import GameBoard from "../../components/GameBoard/GameBoard";
import GameOverScreen from "../../components/GameOverScreen/GameOverScreen";
import { Chess, WHITE} from "chess.js";
import "./GamePage.scss";
import { useState } from "react";

export default function GamePage() {
  const [capturedPieces, setCapturedPieces] = useState({white: [], black: []});
  const [isGameOver, setGameOver] = useState({gameOver: false, reason: null});

  const chess = new Chess();
  console.log(chess);
  //const chess = new Chess("1K6/PPPPPPPP/8/8/8/8/pppppppp/6k1 w - - 0 1");

  function handlePieceCapture(piece,sideToMove) {
    let pieces = {...capturedPieces};
    if (sideToMove == WHITE) {
      pieces.white.push(piece);
    }
    else {
      pieces.black.push(piece);
    }
    console.log(chess);
    setCapturedPieces(pieces);
    console.log(capturedPieces);
  }

  function handleGameOver(reason) {
    console.log(reason);
    setGameOver({gameOver: true, reason: reason});
  }
  return (
    <div className='game-page'>
      <Header />

      <div className='game-board-wrapper'>
        <GameBoard
          chess={chess}
          onGameOver={handleGameOver}
          onPieceCapture={handlePieceCapture}
        />
      </div>
      {isGameOver.gameOver ? <GameOverScreen reason={isGameOver.reason} capturedPieces={capturedPieces} /> : null}
    </div>
  );
}
