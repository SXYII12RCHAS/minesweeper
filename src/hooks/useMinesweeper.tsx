import { TBoard } from "../types";
import { initGame } from "../utils";
import { useState, useCallback, useEffect, use } from "react";
import { revealEmptyCells } from "../utils";
import { revealAllMines } from "../utils";
import { checkGameWon } from "../utils";
import { LEVELS } from "../constants";
import { DEFAULT_LEVEL } from "../constants";
import { Level } from "../types";
import { useTimer } from "./useTimer";

export const useMinesweeper = () => {
    const [Level, setLevel] = useState(DEFAULT_LEVEL)
    const currentLevel = LEVELS[Level]
    const changeLevel = useCallback((level: Level) => setLevel(level), [])

    const [Game, setGame] = useState(initGame(currentLevel.rows, currentLevel.columns, currentLevel.mines));

    const resetBoard = useCallback((restart?: boolean) => {
        stopTimer()
        resetTimer()
        setTotalFlags(0)
        setIsGameOver(false)
        setIsGameWon(false)

        if(restart){
            setGame((prev) => {
                const newGame = JSON.parse(JSON.stringify(prev))
                for (let i = 0; i < currentLevel.rows; i++) {
                    for (let j = 0; j < currentLevel.columns; j++) {
                        newGame[i][j].isOpened = false
                        newGame[i][j].isFlagged = false
                        newGame[i][j].highlight = null
                        value: newGame[i][j].value
                    }
                }
                return newGame
            })
        }
        else{
            setGame(initGame(currentLevel.rows, currentLevel.columns, currentLevel.mines))
        }
        
    }, [currentLevel])

    const startNewGame = useCallback(() => {
        resetBoard()
    }, [resetBoard])

    const restartGame = useCallback(() => {
        resetBoard(true);
      }, [resetBoard]);

    useEffect(() => {
        startNewGame()
    }, [Level])

    const [totalFlags, setTotalFlags] = useState(0)
    const minesLeft = currentLevel.mines - totalFlags
    const [IsGameOver, setIsGameOver] = useState(false);
    const [IsGameWon, setIsGameWon] = useState(false);
    const IsGameEnded = IsGameOver || IsGameWon

    const { startTimer, stopTimer, resetTimer, timeDiff, isRunning } = useTimer()

    useEffect(() => {
        if(IsGameEnded){
            stopTimer()
        }
    }, [IsGameEnded])

    const openCell = (Board: TBoard, row: number, col: number) => {
        if(!isRunning){
            startTimer()
        }
        
        const newGame = JSON.parse(JSON.stringify(Board))
        const cell = newGame[row][col]

        const isMine = cell.value === "mine"
        const isNumber = typeof cell.value === "number" && cell.value > 0
        const isEmpty = typeof cell.value === "number" && cell.value === 0

        if(isMine){
            console.log("isMine")
            setIsGameOver(true)
            cell.highlight = "red"
            revealAllMines(newGame)
        }

        if(!isMine){
            cell.isOpened = true
            if(isNumber){
                console.log("isNumber")
            }

            if(isEmpty){

                revealEmptyCells(newGame, currentLevel.rows, currentLevel.columns, row, col)

                console.log("isEmpty")
            }

            if(checkGameWon(newGame, currentLevel.mines)){
                setIsGameWon(true)
                revealAllMines(newGame, true)
            }
        }

        return newGame
     }

    const handleLeftClick = (row: number, col: number) => {
        if(IsGameEnded || Game[row][col].isOpened || Game[row][col].isFlagged)
        {
            return null
        }

        const newGame: TBoard = JSON.parse(JSON.stringify(Game))

        const boardOpenedCell = openCell(newGame, row, col)

        if(boardOpenedCell){
            setGame(boardOpenedCell)
        }
        
    }

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>, row: number, col: number) => {
        event.preventDefault()

        if(IsGameEnded || Game[row][col].isOpened)
        {
            return null
        }

        if(!isRunning){
            startTimer()
        }

        let flags = 0

        setGame((Board) => {
            const newGame: TBoard = JSON.parse(JSON.stringify(Board))
            const cell = Board[row][col]
            

            if(cell.isFlagged){
                newGame[row][col].isFlagged = false
                if(!flags) flags--
            }
            if(!cell.isFlagged){
                newGame[row][col].isFlagged = true
                if(!flags) flags++
            }

            return newGame
        })

        setTotalFlags((prev) => prev + flags)
    }

    return { Level, changeLevel, Game, handleLeftClick, handleRightClick, IsGameWon, IsGameOver, IsGameEnded, minesLeft, timeDiff, startNewGame, restartGame }
}