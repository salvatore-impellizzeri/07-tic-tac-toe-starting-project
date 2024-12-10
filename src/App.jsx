import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import { useState } from 'react';

function App() {
  const [activePlayer, setActivePLayer] = useState('X');

  function handleSelectSquare() {
    setActivePLayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initalName={"Player 1"} symbol={"X"} isActive={activePlayer === 'X'}/>
          <Player initalName={"Player 2"} symbol={"O"} isActive={activePlayer === 'O'}/>
        </ol>

        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>

      LOG
    </main>
  );
}

export default App
