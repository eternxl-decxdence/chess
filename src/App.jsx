import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GameBoard from "./components/GameBoard/GameBoard";

function App() {
  return (
    <>
      <GameBoard></GameBoard>
    </>
  );
}

export default App;
