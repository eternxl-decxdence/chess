import Header from "../../components/Header/Header";
import GameBoard from "../../components/GameBoard/GameBoard";
import GameOverScreen from "../../components/GameOverScreen/GameOverScreen";

import "./GamePage.scss";
import { useState } from "react";

export default function GamePage() {
  const [capturedPieces, setCapturedPieces] = useState(null);
  const [isGameOver, setGameOver] = useState(false);

  function handleGameOver() {}
  return (
    <div className='game-page'>
      <Header />

      <div className='game-board-wrapper'>
        <GameBoard
          capturedPieces={capturedPieces}
          setGameOver={handleGameOver}
          setTakenPieces={handlePieceCapture}
        />
      </div>
      <GameOverScreen capturedPieces={capturedPieces} />
    </div>
  );
}
