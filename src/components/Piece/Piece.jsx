import "./Piece.scss";

import PieceIcon from "../../assets/symbol-defs.svg";
import { returnPieceIconName } from "../../utils/js/utils";
import { WHITE } from "chess.js";

export default function Piece({ data }) {
  return (
    <span className='piece'>
      <svg className={`icon-${data.color == WHITE ? "white" : "black"}`}>
        <use href={`${PieceIcon}#${returnPieceIconName(data)}`}></use>
      </svg>
    </span>
  );
}
