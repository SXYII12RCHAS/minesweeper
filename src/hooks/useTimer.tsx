
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { getTimeDifference } from "../utils"

export const useTimer = () => {
    const interval = useRef<null | number>(null)
    const [start, setStart] = useState<Date | null>(null)
    const [time, setTime] = useState<Date | null>(null)
    const timeDiff = useMemo(() => getTimeDifference(start,time), [time]);
    const isRunning = Boolean(start)

    const startTimer = useCallback(() => {
        setStart(new Date())
    },[])

    const stopTimer = useCallback(() => {
        clearInterval(interval.current!)
    },[])

    const resetTimer = useCallback(() => {
        setStart(null)
        setTime(null)
    },[])

    useEffect(() => {
        if(!start) return

        interval.current = setInterval(() => {
            setTime(new Date())
        }, 1000)
    }, [start])

    return { startTimer, stopTimer, resetTimer, timeDiff, isRunning }
}