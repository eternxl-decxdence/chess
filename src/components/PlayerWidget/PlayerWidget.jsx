import "./PlayerWidget.scss";
import Spirtesheet from "../../assets/symbol-defs.svg";
import SmallPiece from "../SmallPiece/SmallPiece";
import Timer from "../Timer/Timer";
import { BISHOP, ROOK, BLACK, KNIGHT, PAWN, QUEEN, WHITE } from "chess.js";

export default function PlayerWidget({
  color,
  pieces,
  playerName,
  mobile,
  onTimeout,
  activeSide,
  isGameStarted
}) {
  const pattern = [QUEEN, BISHOP, ROOK, KNIGHT, QUEEN, PAWN];
  function sortArray(array, pattern) {
    return array.sort(function (a, b) {
      if (pattern.indexOf(a) === pattern.indexOf(b)) {
        return 0;
      } else {
        return pattern.indexOf(a) > pattern.indexOf(b) ? 1 : -1;
      }
    });
  }
  if (mobile) {
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
            <span className='name-text'>
              {color === WHITE ? "White" : "Black"}
            </span>
          </div>
        </div>
        <hr />
        <div className='pieces-wrapper'>
          {sortArray(pieces, pattern).map((piece, index) => (
            <SmallPiece
              key={index}
              piece={{ type: piece, color: color == WHITE ? BLACK : WHITE }}
            />
          ))}
        </div>
        <hr />
        <Timer
          color={color == WHITE ? "white" : "black"}
          onTimeout={onTimeout}
          isActive={isGameStarted && activeSide == color}
        />
      </div>
    );
  } else {
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
            {sortArray(pieces, pattern).map((piece, index) => (
              <SmallPiece
                key={index}
                piece={{ type: piece, color: color == WHITE ? BLACK : WHITE }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
