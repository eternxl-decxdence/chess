import "./BoardControls.scss";
import Spritesheet from "../../assets/symbol-defs.svg";
export default function BoardControls({ onUndo, onRedo, onForfeit }) {
  return (
    <div className='controls-wrapper'>
      <button title='Undo' className='control-button'>
        <svg className='icon'>
          <use href={`${Spritesheet}#icon-undo`}></use>
        </svg>
      </button>
      <button title='Redo' className='control-button'>
        <svg className='icon'>
          <use href={`${Spritesheet}#icon-redo`}></use>
        </svg>
      </button>
      <button title='Forfeit' className='control-button'>
        <svg className='icon'>
          <use href={`${Spritesheet}#icon-flag`}></use>
        </svg>
      </button>
    </div>
  );
}
