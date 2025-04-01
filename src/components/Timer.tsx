import timerIcon from "/icons/timer.svg"


export default function Timer({timeDiff}: {timeDiff:string}) {
    return (
        <>
            <img src={timerIcon} alt="timer" className="headerIcon" />
            <span>{timeDiff}</span>
        </>
    )
}