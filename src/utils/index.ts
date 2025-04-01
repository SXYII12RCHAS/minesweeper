import { TBoard, gameCell } from "../types"
import { DIRECTIONS } from "../constants"

const createBoard = (rows: number, cols: number) => {
    const Board: TBoard = []

    for( let i = 0; i < rows; i++){
        Board[i] = []

        for( let j = 0; j < cols; j++){
            Board[i][j] = {value: null, isFlagged: false, isOpened: false}
        }
    }

    return Board
}

const fillBoardWithMines = (Board: TBoard, rows: number, cols: number, totalMines: number) => {
    let mines = 0;
    while(mines < totalMines){
        const row = Math.floor(Math.random() * rows)
        const col = Math.floor(Math.random() * cols)

        if(Board[row][col].value !== "mine") {
            (Board[row][col] as gameCell).value = "mine"
            mines++
        }
    }
    
    return Board
}

const fillBoardWithNumbers = (Board: TBoard) => {

    Board.forEach((row, i) => {
        row.forEach((cell, j) => {
            if(cell.value !== "mine"){
                let mines = 0

                DIRECTIONS.forEach(([differenceRow,differenceCol]) => {
                    const newRow = i + differenceRow
                    const newCol = j + differenceCol
                    
                    if(newRow in Board && newCol in Board[newRow]){
                        if(Board[newRow][newCol].value === "mine"){
                            mines++
                        }
                    }
                })

                cell.value = mines
            }
        })
    })

    return Board

}

export const initBoard = (rows: number, cols: number, totalMines: number) => {
    const Board = createBoard(rows, cols)
    const Mines = fillBoardWithMines(Board, rows, cols, totalMines)
    const Numbers = fillBoardWithNumbers(Mines)

    return Numbers
}

export const initGame = (rows: number, cols: number, totalMines: number) => {
    return initBoard(rows, cols, totalMines)
}

export const revealEmptyCells = (Board: TBoard, rows: number, cols: number, row: number, col: number) => {

    const queue: [number,number][] = [[row,col]]

    while(queue.length > 0){
        const [currentRow, currentCol] = queue.shift()!

        const cell = Board[currentRow][currentCol]
        cell.isOpened = true

        if(cell.value === 0){
            for(const [differenceRow, differenceCol] of DIRECTIONS){
                const newRow = currentRow + differenceRow
                const newCol = currentCol + differenceCol

                if(newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !Board[newRow][newCol].isOpened && !Board[newRow][newCol].isFlagged){
                    queue.push([newRow, newCol])
                }
            }
        }
    }

    return Board
}

export const revealAllMines = (Board: TBoard, highlightWin? : boolean) => {
    Board.forEach((row, i) => {
        row.forEach((cell, j) => {
            if(cell.value === "mine"){

                cell.isOpened = true
                
                if(highlightWin){
                    cell.highlight = "green"
                }
            }
        })
    })
}

export const checkGameWon = (Board: TBoard, numberOfMines: number) => {

    let unOpenedCells = 0
    let flaggedMines = 0

    Board.forEach((row) => {
        row.forEach((cell) => {
            if(!cell.isOpened){
                unOpenedCells++
            }

            if(cell.isFlagged && cell.value === "mine"){
                flaggedMines++
            }
        })
    })

    if( unOpenedCells === numberOfMines || flaggedMines === numberOfMines){
        return true
    }else{
        return false
    }
}

export const getTimeDifference = (start: Date | null, now: Date | null) => {
    if(now === null || start === null) return "00:00"

    return new Intl.DateTimeFormat("en-US", {
        minute: "2-digit",
        second: "numeric"
    }).format(now.getTime() - start.getTime())
}