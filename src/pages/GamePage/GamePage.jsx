import Header from "../../components/Header/Header";
import GameBoard from "../../components/GameBoard/GameBoard";
import GameOverScreen from "../../components/GameOverScreen/GameOverScreen";

import "./GamePage.scss";

export default function GamePage() {
  return (
    <div className='game-page'>
      <Header />

      <div className='game-board-wrapper'>
        <GameBoard />
      </div>
      <GameOverScreen/>
    </div>
  );
}
