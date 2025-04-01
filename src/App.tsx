import './App.css'
import Header from './components/Header'
import Board from './components/Board'
import Levels from './components/Levels'
import { useMinesweeper } from './hooks/useMinesweeper'


function App() {

  const {Level, changeLevel, Game, handleLeftClick, handleRightClick, IsGameWon, IsGameEnded, IsGameOver, minesLeft, timeDiff, startNewGame, restartGame } = useMinesweeper()

  return (
    <>
      <div className='Game'>
        <Header isGameWon={IsGameWon} isGameOver={IsGameOver} isGameEnded={IsGameEnded} minesLeft={minesLeft} timeDiff={timeDiff} startNewGame={startNewGame} restartGame={restartGame} />
        <Board level={Level} Board={Game} handleLeftClick={handleLeftClick} handleRightClick={handleRightClick}/>
        <Levels level={Level} changeLevel={changeLevel}/>
      </div>
    </>
  )
}

export default App
