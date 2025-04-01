import Cell from "./Cell"
import { TBoard } from "../types"
import { Level } from "../types"

type Props = {
  Board: TBoard
  handleLeftClick: (row: number, col: number) => void
  handleRightClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => void
  level: Level
}

const Board = (props: Props) => {

  const { level, Board, handleLeftClick, handleRightClick } = props

  return (
    <div className="Board">
      {Board.map((row, rowi) => (
        <div className="row">{row.map((cell, coli) => <Cell level = {level} cell={cell} rowi={rowi} coli={coli} handleLeftClick={handleLeftClick} handleRightClick={handleRightClick}/>)}</div>
    ))}
    </div>
  )
}

export default Board