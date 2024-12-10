import "./App.css";
import GamePage from "./pages/GamePage/GamePage";
import { Chess } from "chess.js";
import { useState } from "react";
function App() {
  const [active, setActive] = useState(true);
  const [seed, setSeed] = useState(1);

  let chess = new Chess();

  function resetGamePage() {
    setSeed(Math.random());
  }

  function handleReset() {
    console.log("reset");
    chess = new Chess();
    setActive(true);
    resetGamePage();
  }
  return (
    <GamePage
      key={seed}
      gameActive={active}
      chess={chess}
      onReset={handleReset}
    />
  );
}

export default App;
