import {Level} from "../types"

export const CELLS_NUMBERS_COLORS = [
    null, 'one', 'two' ,'three', 'four', 'five', 'six', 'seven', 'eight'
]

export const DIRECTIONS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
]

export const LEVELS = {
    easy: {rows: 9, columns: 9, mines: 10},
    medium: {rows: 16, columns: 16, mines: 40},
    hard: {rows: 16, columns: 30, mines: 99},
}

export const DEFAULT_LEVEL: Level = "easy"