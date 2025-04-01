import clsx from "clsx"
import { CELLS_NUMBERS_COLORS } from "../constants"
import mineIcon from "/icons/bomb.svg"
import flagIcon from "/icons/flag.png"
import { gameCell } from "../types"
import { Level } from "../types"

type CellProps = {
  cell: gameCell
  handleLeftClick: (row: number, col: number) => void
  handleRightClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => void
  rowi: number
  coli: number
  level: Level
}

const Cell = ({level, cell, handleLeftClick, handleRightClick, rowi, coli}: CellProps) => {
  return (
    <div onClick={() => handleLeftClick(rowi, coli)} onContextMenu={(e) => handleRightClick(e,rowi,coli)} className={clsx("cell", typeof cell.value === 'number' && CELLS_NUMBERS_COLORS[cell.value], cell.value === "mine" && cell.highlight, level != "easy" && "small")}>
      {typeof cell.value === 'number' && <>{cell.value || ''}</>}
      {cell.value === 'mine' && <img src={mineIcon} alt="mine" />}
      {!cell.isOpened && <div className="overlay"><img src={flagIcon} className={clsx("flag", cell.isFlagged && "flagged")} alt="flag" /></div>}
    </div>
  )
}
export default Cell 