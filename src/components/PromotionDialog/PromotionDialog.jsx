import { KNIGHT, BISHOP, ROOK, QUEEN, WHITE } from "chess.js";

import Piece from "../Piece/Piece";

import "./PromotionDialog.scss";

const pieces = [BISHOP, KNIGHT, ROOK, QUEEN];

export default function PromotionDialog({
  activeSquare,
  moveTo,
  dialogPosition,
  onPromotion,
  onClose
}) {
  const styles = {
    "--row": activeSquare.color == WHITE ? 0 : 4,
    "--col": dialogPosition.col,
    flexDirection: activeSquare.color == WHITE ? "column" : "column-reverse"
  };
  return (
    <div className='promotion-dialog-overlay' onClick={onClose}>
      <dialog className='promotion-dialog' style={styles}>
        {pieces.map((piece) => (
          <button
            key={piece.toString()}
            onClick={() => onPromotion(moveTo, piece)}
            className='promotion-button'
          >
            <Piece pieceData={{ type: piece, color: activeSquare.color }} />
          </button>
        ))}
      </dialog>
    </div>
  );
}
