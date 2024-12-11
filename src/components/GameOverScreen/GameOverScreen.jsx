import { BLACK, WHITE } from "chess.js";
import Spirtesheet from "../../assets/symbol-defs.svg";
import SmallPiece from "../SmallPiece/SmallPiece";
import "./GameOverScreen.scss";

export default function GameOverScreen({ reason, capturedPieces, onRestart }) {
  return (
    <div className='game-over-dialog-overlay'>
      <dialog open className='game-over-dialog'>
        <div className='header-wrapper'>
          <h2 className='header-label'>Game Over by {reason}</h2>
        </div>
        <div className='players-statistics-wrapper'>
          <div className='player-card'>
            <div className='player-profile'>
              <svg className='placeholder-logo'>
                <use href={`${Spirtesheet}#icon-user`} />
              </svg>
            </div>
            <div className='player-data-wrapper'>
              <div className='name-wrapper'>
                <span className='name-text'>Player 1</span>
                <hr />
                <span className='name-text'>White</span>
              </div>
              <div className='pieces-wrapper'>
                {capturedPieces.white.map((piece, index) => (
                  <SmallPiece
                    key={index}
                    piece={{ type: piece, color: WHITE}}
                  />
                ))}
              </div>
            </div>
          </div>
          <hr className='card-separator' />
          <div className='player-card'>
            <div className='player-profile'>
              <svg className='placeholder-logo'>
                <use href={`${Spirtesheet}#icon-user`} />
              </svg>
            </div>
            <div className='player-data-wrapper'>
              <div className='name-wrapper'>
                <span className='name-text'>Player 2</span>
                <hr />
                <span className='name-text'>Black</span>
              </div>
              <div className='pieces-wrapper'>
                {capturedPieces.black.map((piece, index) => (
                  <SmallPiece
                    key={index}
                    piece={{ type: piece, color: BLACK }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='buttons-wrapper'>
          <button className='restart-button' onClick={onRestart}>
            Restart
          </button>
        </div>
      </dialog>
    </div>
  );
}
