import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combination.js';

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePLayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);
  
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns){
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
  }
  
  let winner = null;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol){
        winner = firstSquareSymbol
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePLayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square:{ row: rowIndex, col:colIndex }, player: activePlayer }, ...prevTurns
      ];
      console.log(updatedTurns);

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initalName={"Player 1"} symbol={"X"} isActive={activePlayer === 'X'}/>
          <Player initalName={"Player 2"} symbol={"O"} isActive={activePlayer === 'O'}/>
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}

        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>

      <Log turnsInfo={gameTurns}/>
    </main>
  );
}

export default App
