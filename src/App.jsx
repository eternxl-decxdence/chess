import { useState } from "react";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GamePage from "./pages/GamePage/GamePage";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
