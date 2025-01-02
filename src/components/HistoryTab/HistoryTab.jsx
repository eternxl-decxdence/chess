import "./HistoryTab.scss";
import Spritesheet from "../../assets/symbol-defs.svg";
export default function HistoryTab({ history, mobile, closeHistory }) {
  if (mobile) {
    return (
      <div className='history-dialog-overlay' onClick={closeHistory}>
        <div className='history-tab'>
          <div className='header-wrapper'>
            <span className='title'>Moves</span>
            <button className='close-dialog' onClick={closeHistory}>
              <svg className='close-icon'>
                <use href={`${Spritesheet}#icon-cross`}></use>
              </svg>
            </button>
          </div>
          <hr className='separator' />
          <div className='moves'>
            {history.map((element, index) => (
              <div key={element.white + element.black} className='move'>
                <span className='move-number'>{index + 1}</span>
                <hr className='divider' />
                <div className='move-container'>
                  <div className='move-white'>
                    <hr className='decorator' />
                    <span className='notation'>{element.white}</span>
                    <hr className='decorator' />
                  </div>
                  {element.black !== undefined && (
                    <div className='move-black'>
                      <hr className='decorator' />
                      <span className='notation'>{element.black}</span>
                      <hr className='decorator' />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='history-tab'>
        <span className='title'>Moves</span>
        <hr className='separator' />
        <div className='moves'>
          {history.map((element, index) => (
            <div key={element.white + element.black} className='move'>
              <span className='move-number'>{index + 1}</span>
              <hr className='divider' />
              <div className='move-container'>
                <div className='move-white'>
                  <hr className='decorator' />
                  <span className='notation'>{element.white}</span>
                  <hr className='decorator' />
                </div>
                {element.black !== undefined && (
                  <div className='move-black'>
                    <hr className='decorator' />
                    <span className='notation'>{element.black}</span>
                    <hr className='decorator' />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
