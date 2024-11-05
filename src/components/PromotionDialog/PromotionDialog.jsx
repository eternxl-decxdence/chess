import { KNIGHT, BISHOP, ROOK, QUEEN, WHITE } from "chess.js";

import Piece from "../Piece/Piece";

import "./PromotionDialog.scss";
import { useState } from "react";

const pieces = [BISHOP, KNIGHT, ROOK, QUEEN];

export default function PromotionDialog({
  activeSquare,
  moveTo,
  dialogPosition,
  onPromotion,
  onClose
}) {
  const [closed, setClosed] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const styles = {
    "--row": activeSquare.color == WHITE ? 0 : 4,
    "--col": dialogPosition.col,
    flexDirection: activeSquare.color == WHITE ? "column" : "column-reverse"
  };

  function handleClosureTransition(event) {
    event.stopPropagation();
    setClosed(true);
  }
  function handleDialogClosure() {
    if (selectedPiece != null) {
      onPromotion(moveTo, selectedPiece);
    } else {
      onClose();
    }
  }
  function handlePromoteMove(event, piece) {
    event.stopPropagation();
    setSelectedPiece(piece);
    setClosed(true);
  }
  return (
    <div
      className='promotion-dialog-overlay'
      onClick={(event) => handleClosureTransition(event)}
    >
      <dialog
        open
        className={`promotion-dialog ${
          activeSquare.color == WHITE ? "white" : "black"
        } ${closed ? "closed" : ""}`}
        style={styles}
        onTransitionEnd={handleDialogClosure}
      >
        {pieces.map((piece) => (
          <button
            key={piece.toString()}
            onClick={(event) => handlePromoteMove(event, piece)}
            className='promotion-button'
          >
            <Piece
              draggable={false}
              pieceData={{ type: piece, color: activeSquare.color }}
            />
          </button>
        ))}
      </dialog>
    </div>
  );
}
