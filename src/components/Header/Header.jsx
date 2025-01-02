import SpriteSheet from "../../assets/symbol-defs.svg";
import "./Header.scss";

export default function Header({ mobile, openHistory }) {
  if (mobile) {
    return (
      <div className='header'>
        <div className='navbar'>
          <svg className='logo'>
            <use href={`${SpriteSheet}#icon-chess-logo`}></use>
          </svg>
          <span className='navlabel'>Chess</span>
          <button className='navlabel-active'>New Game</button>
          <button className='navlabel-active'>Load</button>
        </div>
        <button className='history-button' onClick={openHistory}>
          <svg className='history-icon'>
            <use href={`${SpriteSheet}#icon-history`} />
          </svg>
        </button>
      </div>
    );
  } else {
    return (
      <div className='header'>
        <div className='navbar'>
          <svg className='logo'>
            <use href={`${SpriteSheet}#icon-chess-logo`}></use>
          </svg>
          <span className='navlabel'>Chess</span>
          <button className='navlabel-active'>New Game</button>
          <button className='navlabel-active'>Load</button>
        </div>
      </div>
    );
  }
}
