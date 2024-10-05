import "./GameOverScreen.scss";

export default function GameOverScreen({ reason, side }) {
  return (
    <div className='screen-overlay'>
      <div className='game-over-screen'>
        <button className='replay-button'>test</button>
      </div>
    </div>
  );
}
