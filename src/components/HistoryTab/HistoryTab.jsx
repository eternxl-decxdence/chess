import "./HistoryTab.scss";
import { useState } from "react";

export default function HistoryTab({ history }) {
  return (
    <div className='history-tab'>
      <span className='title'>Moves</span>
      <hr className='separator' />
      <div className='moves'>{}</div>
    </div>
  );
}
