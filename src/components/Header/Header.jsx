import { Link } from "react-router-dom";
import "./Header.scss";
import Spritesheet from "../../assets/symbol-defs.svg";
export default function Header() {
  return (
    <div className='header'>
      <div className='navbar-wrapper'>
        <svg className='icon-chessboard'>
          <use href={`${Spritesheet}#icon-chess-logo`}></use>
        </svg>
        <span className='nav-element'>Chess</span>
        <span className='nav-element'>New Game</span>
        <span className='nav-element'>Load</span>
        <span className='nav-element'>Board Editor</span>
      </div>
    </div>
  );
}
