import mineIcon from "/icons/bomb.svg"


type StatusProps = {
  isGameWon: boolean
  isGameOver: boolean
  isGameEnded: boolean
  minesLeft: number
}

export default function Status(props: StatusProps) {
    const { isGameWon, isGameOver, isGameEnded, minesLeft } = props
  return (
    <>
      {isGameWon && <span>You Won!</span>}
      {isGameOver && <span>Game Over</span>}
      
      {!isGameEnded && (
        <>
        <img src={mineIcon} alt="bomb" className="headerIcon" />
        {minesLeft}
        </>
      )}
    </>
  )
}