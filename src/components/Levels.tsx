import { Level } from "../types"
import { LEVELS } from "../constants"
import clsx from "clsx"

type LevelProps = {
    level: string
    changeLevel: (level: Level) => void
}

const Levels = ({level, changeLevel} : LevelProps) => {
    return (
        <div className="Levels">
            {Object.keys(LEVELS).map((levelName) => {
                return (
                    <button className={clsx(level === levelName && "Active")} key={levelName} onClick={() => changeLevel(levelName as Level)}>{levelName}</button>
                )
            })}
        </div>
    )
}

export default Levels