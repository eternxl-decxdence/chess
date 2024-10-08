import "./PromotionDialog.scss";
import crossIcon from "../../assets/symbol-defs.svg";
import { defaultSquareNotation } from "../../utils/js/utils";
import { WHITE } from "chess.js";

import Piece from "../Piece/Piece";
import { useState } from "react";

export default function PromotionDialog({
  sideToMove,
  row,
  column,
  onClose,
  onPromotionSelect
}) {
  const [isOpen, setIsOpen] = useState(true);

  const figures = ["q", "b", "r", "n"];
  function handlePieceSelect(figure) {
    onPromotionSelect(defaultSquareNotation(column, row), figure);
    closeModal();
  }
  function closeModal() {
    setIsOpen(false);
    onClose();
  }
  return (
    <div className='promotion-dialog-overlay' onClick={closeModal}>
      <dialog
        open={isOpen}
        className={`promotion-dialog ${
          sideToMove == WHITE ? "side-white" : "side-black"
        }`}
        style={{ "--column-number": column }}
      >
        {figures.map((figure) => (
          <div
            key={figure}
            className='piece-click'
            onClick={() => handlePieceSelect(figure)}
          >
            <Piece data={{ type: figure, color: sideToMove }} />
          </div>
        ))}
        <button
          className={`close-dialog ${
            sideToMove == WHITE ? "side-white" : "side-black"
          }`}
          onClick={closeModal}
        >
          <svg className='cross-icon'>
            <use href={`${crossIcon}#icon-cross`}></use>
          </svg>
        </button>
      </dialog>
    </div>
  );
}
