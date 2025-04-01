import {LEVELS} from "../constants"

type openedCell = {isOpened: true; isFlagged: false}
type closedCell = {isopened: false; isFlagged: boolean}
type mineCell = {value: "mine"; highlight?: "red" | "green"}
type numberCell = { value: number}
type emptyCell = { value: null; isFlagged: false; isOpened: false}

export type openedMineCell = openedCell & mineCell
type closedMineCell = closedCell & mineCell
export type openedNumberCell = openedCell & numberCell
type closedNumberCell = closedCell & numberCell

export type gameCell = openedMineCell | closedMineCell | openedNumberCell | closedNumberCell | emptyCell

export type TBoard = gameCell[][]

export type Level = keyof typeof LEVELS