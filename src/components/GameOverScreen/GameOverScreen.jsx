import "./GameOverScreen.scss";


export default function GameOverScreen() {
  return (
    <div className='game-over-dialog-overlay'>
      <dialog open className='game-over-dialog'>
        <h2 className='winner-label'> White won!</h2>
      </dialog>
    </div>
  );
}
