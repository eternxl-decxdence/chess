import Header from "../../components/Header/Header";
import GameBoard from "../../components/GameBoard/GameBoard";
import GameOverScreen from "../../components/GameOverScreen/GameOverScreen";
import Timer from "../../components/Timer/Timer";
import HistoryTab from "../../components/HistoryTab/HistoryTab";
import BoardControls from "../../components/BoardControls/BoardControls";

import { WHITE, BLACK } from "chess.js";
import "./GamePage.scss";
import { useState } from "react";
import PlayerWidget from "../../components/PlayerWidget/PlayerWidget";

export default function GamePage({ chess, onReset }) {
  const [capturedPieces, setCapturedPieces] = useState({
    white: [],
    black: []
  });
  const [isGameOver, setGameOver] = useState({ gameOver: false, reason: null });
  const [isGameStarted, setGameStarted] = useState(false);
  const [activeSide, setActiveSide] = useState(WHITE);
  const [history, setHistory] = useState([]);

  function handleTimeout() {
    setGameOver({ gameOver: true, reason: "Timeout" });
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
    setCapturedPieces(pieces);
  }
  function handleHistoryUpdate(result) {
    setHistory((prevState) => {
      let update = [...result];
      update.map((element) => ({ ...element }));
      return update;
    });
  }
  function handleGameOver(reason) {
    setGameOver({ gameOver: true, reason: reason });
  }
  return (
    <div className='game-page'>
      <Header />
      <div className='player-widgets-wrapper'>
        <PlayerWidget
          playerName={"Player 1"}
          color={WHITE}
          pieces={capturedPieces.white}
        />
        <PlayerWidget
          playerName={"Player 2"}
          color={BLACK}
          pieces={capturedPieces.black}
        />
      </div>
      <div className='game-board-wrapper'>
        <GameBoard
          chess={chess}
          onGameOver={handleGameOver}
          onPieceCapture={handlePieceCapture}
          onFirstMove={handleGameStart}
          onSideChange={handleSideChange}
          onHistoryUpdate={handleHistoryUpdate}
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
      <HistoryTab history={history} />
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
