import SpriteSheet from "../../assets/symbol-defs.svg";
import "./Header.scss";

export default function Header() {
  return (
    <div className='header'>
      <div className='navbar'>
        <svg className='logo'>
          <use href={`${SpriteSheet}#icon-chess-logo`}></use>
        </svg>
        <span className='navlabel'>Chess</span>
        <button className='navlabel-active'>New Game</button>
        <button className='navlabel-active'>Load</button>
        <button className='navlabel-active'>Board Editor</button>
      </div>
    </div>
  );
}
