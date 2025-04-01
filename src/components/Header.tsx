import Status from "./Status"
import Timer from "./Timer"

type HeaderProps = {
  isGameWon: boolean
  isGameOver: boolean
  isGameEnded: boolean
  minesLeft: number
  timeDiff: string
  startNewGame: () => void
  restartGame: () => void
}

export default function Header(props : HeaderProps) {
    const { isGameWon, isGameOver, isGameEnded, minesLeft, timeDiff, startNewGame, restartGame } = props
  return (
    <header>
        <div className="headerLabel">
            <Status isGameWon={isGameWon} isGameOver={isGameOver} isGameEnded={isGameEnded} minesLeft={minesLeft}/>
        </div>
        <div className="headerButtons">
          <button onClick={startNewGame}>New</button>
          <button onClick={restartGame}>Restart</button>
        </div>
        <div className="headerLabel">
            <Timer timeDiff = {timeDiff}/>
        </div>
        
        
    </header>
  )
}