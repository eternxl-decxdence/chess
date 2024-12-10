import "./Timer.scss";
import { useEffect, useState } from "react";
import Spritesheet from "../../assets/symbol-defs.svg";

export default function Timer({ color, onTimeout, isActive }) {
  const [time, setTime] = useState({ minutes: 0, seconds: 30 });

  useEffect(() => {
    if (isActive && time.minutes >= 0) {
      setTimeout(() => {
        if (time.minutes <= 0 && time.seconds <= 0) {
          onTimeout();
        }
        if ((time.seconds <= 0) & (time.minutes > 0)) {
          setTime({ minutes: time.minutes - 1, seconds: 59 });
        } else if (time.seconds != 0) {
          setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
        }
      }, 1000);
    }
  }, [time, isActive]);

  return (
    <div
      className={`timer-box ${color}${isActive == false ? " inactive" : ""}`}
    >
      <svg className='timer-icon'>
        <use href={`${Spritesheet}#icon-clock`}></use>
      </svg>
      <span className='time'>
        {time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}
      </span>
    </div>
  );
}
