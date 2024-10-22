import { WHITE } from "chess.js";

import "./Piece.scss";
import Spritesheet from "../../assets/symbol-defs.svg";
import { returnPieceIconName } from "../../utils/js/utils";

export default function Piece({ pieceData }) {
  return (
    <span className='piece-icon-box'>
      <svg className={`piece${pieceData.color == WHITE ? "-white" : "-black"}`}>
        <use href={`${Spritesheet}#${returnPieceIconName(pieceData)}`} />
      </svg>
    </span>
  );
}
