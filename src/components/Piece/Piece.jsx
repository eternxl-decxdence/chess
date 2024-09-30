import "./Piece.scss";

import PieceIcon from "../../assets/symbol-defs.svg";
import { returnPieceIconName } from "../../utils";

export default function Piece({ data }) {
  return (
    <span className='piece'>
      <svg className='icon'>
        <use href={`${PieceIcon}#${returnPieceIconName(data)}`}></use>
      </svg>
    </span>
  );
}
