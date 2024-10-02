import "./PromotionDialog.scss";
import crossIcon from "../../assets/cross.svg";
import { defaultSquareNotation } from "../../utils";
import { WHITE } from "chess.js";

import Piece from "../Piece/Piece";
export default function PromotionDialog({
  sideToMove,
  row,
  column,
  onClose,
  onPromotionSelect
}) {
  const figures = ["q", "b", "r", "n"];
  function handlePieceSelect(figure) {
    onPromotionSelect(defaultSquareNotation(column, row), figure);
    onClose();
  }
  return (
    <div className='promotion-dialog-overlay' onClick={onClose}>
      <div className={`promotion-dialog ${sideToMove == WHITE ? 'side-white' : 'side-black' }`} 
      style={{"--column-number": column}}>
        {figures.map((figure) => (
          <div
            key={figure}
            className='piece-click'
            onClick={() => handlePieceSelect(figure)}
          >
            <Piece data={{type: figure, color: sideToMove}}/>
          </div>
        ))}
        <div className="close-dialog" onClick={onClose}>
          <svg className='cross-icon'>
            <use href={`${crossIcon}#icon-cross`}></use>
          </svg>
        </div>
      </div>
    </div>
  );
}
