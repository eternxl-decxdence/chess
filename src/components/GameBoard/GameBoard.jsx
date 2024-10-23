import { Chess } from "chess.js";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { defaultSquareNotation} from "../../utils/js/utils";


import "./GameBoard.scss";
import "./Coordinates.scss";
import Square from "../Square/Square";
import PromotionDialog from "../PromotionDialog/PromotionDialog";


//const chess = new Chess();


const chess = new Chess("1K6/P7/8/8/8/8/7p/6k1 w - - 0 1");

export default function GameBoard() {
  const [chessboard, setChessboard] = useState(chess.board());
  const [activeSquare, setActiveSquare] = useState(null);
  const [promotion, setPromotion] = useState({active: false, moveTo: null});
  function onSquareSelection(square) {
    console.log()
    setActiveSquare(square);
  }
  function onMove(to) {
    chess.move({from: activeSquare.square, to: to });
    setChessboard(chess.board());
  }
  function onPromotion(to){
    setPromotion({active: true, moveTo: to});
  }
  return (
    <DndContext>
      <div className='board'>
        {chessboard.map((row, rowIndex) =>
          row.map((square, colIndex) => (
           <Square 
            position={{col: colIndex, row: rowIndex}}
            key={`${colIndex}${rowIndex}`} 
            squareData={square ? square : {square: defaultSquareNotation(colIndex,rowIndex)}}
            activeSquare={activeSquare}
            isPossibleMove={activeSquare !== null && chess.moves({square: activeSquare.square, verbose: true}).map(({to}) => to).includes(defaultSquareNotation(colIndex,rowIndex))}
            onSquareSelect={onSquareSelection}
            onMove={onMove}/>
          ))
        )}
      </div>
      {promotion.active && 
      <PromotionDialog
        activeSquare={activeSquare}
        moveTo={promotion.moveTo}
      />}
    </DndContext>
  );
}
