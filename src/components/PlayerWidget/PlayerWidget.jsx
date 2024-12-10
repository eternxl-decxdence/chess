import "./PlayerWidget.scss";
import Spirtesheet from "../../assets/symbol-defs.svg";
import SmallPiece from "../SmallPiece/SmallPiece";
import { WHITE } from "chess.js";

export default function PlayerWidget({ color, pieces, playerName }) {
  return (
    <div className='player-widget'>
      <div className='player-profile'>
        <svg className='placeholder-logo'>
          <use href={`${Spirtesheet}#icon-user`} />
        </svg>
      </div>
      <div className='player-data-wrapper'>
        <div className='name-wrapper'>
          <span className='name-text'>{playerName}</span>
          <hr />
          <span className='name-text'>
            {color === WHITE ? "White" : "Black"}
          </span>
        </div>
        <hr className='separator' />
        <div className='pieces-wrapper'>
          {pieces.map((piece, index) => (
            <SmallPiece key={index} piece={{ type: piece, color: color }} />
          ))}
        </div>
      </div>
    </div>
  );
}
