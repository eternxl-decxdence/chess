import { useState } from "react";
import GameBoard from "./components/GameBoard/GameBoard";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<GameBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
