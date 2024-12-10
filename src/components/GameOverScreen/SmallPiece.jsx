import "./SmallPiece.scss";
import { WHITE } from "chess.js";
import Spirtesheet from "../../assets/symbol-defs.svg";
import { returnPieceIconName } from "../../utils/js/utils";

export default function SmallPiece({ piece }) {
  return (
    <span className='captured-piece'>
      <svg
        className={`piece-image${piece.color == WHITE ? "-white" : "-black"}`}
      >
        <use href={`${Spirtesheet}#${returnPieceIconName(piece)}`} />
      </svg>
    </span>
  );
}
