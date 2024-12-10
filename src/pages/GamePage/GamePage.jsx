import Header from "../../components/Header/Header";
import GameBoard from "../../components/GameBoard/GameBoard";
import GameOverScreen from "../../components/GameOverScreen/GameOverScreen";
import Timer from "../../components/Timer/Timer";
import { WHITE, PAWN, ROOK, QUEEN, KNIGHT, BISHOP, BLACK } from "chess.js";
import "./GamePage.scss";
import { useState } from "react";

export default function GamePage({ chess, onReset }) {
  const [capturedPieces, setCapturedPieces] = useState({
    white: [],
    black: []
  });
  const [isGameOver, setGameOver] = useState({ gameOver: false, reason: null });
  const [isGameStarted, setGameStarted] = useState(false);
  const [activeSide, setActiveSide] = useState(WHITE);

  console.log(chess);
  function handleTimeout() {
    console.log("timeout");
    setGameOver({ gameOver: true, reason: "timeout" });
  }
  function handleRestart() {
    onReset();
  }
  function handleSideChange(side) {
    setActiveSide(side);
  }
  function handleGameStart() {
    setGameStarted(true);
  }
  function handlePieceCapture(piece, sideToMove) {
    let pieces = { ...capturedPieces };
    if (sideToMove == WHITE) {
      pieces.white.push(piece);
    } else {
      pieces.black.push(piece);
    }
    console.log(chess);
    setCapturedPieces(pieces);
    console.log(capturedPieces);
  }

  function handleGameOver(reason) {
    console.log(reason);
    setGameOver({ gameOver: true, reason: reason });
  }
  return (
    <div className='game-page'>
      <Header />

      <div className='game-board-wrapper'>
        <GameBoard
          chess={chess}
          onGameOver={handleGameOver}
          onPieceCapture={handlePieceCapture}
          onFirstMove={handleGameStart}
          onSideChange={handleSideChange}
        />
        <div className='timers-wrapper'>
          <Timer
            color='white'
            onTimeout={handleTimeout}
            isActive={isGameStarted && activeSide == WHITE}
          />
          <Timer
            color='black'
            onTimeout={handleTimeout}
            isActive={isGameStarted && activeSide == BLACK}
          />
        </div>
      </div>
      {isGameOver.gameOver ? (
        <GameOverScreen
          reason={isGameOver.reason}
          capturedPieces={capturedPieces}
          onRestart={handleRestart}
        />
      ) : null}
    </div>
  );
}
