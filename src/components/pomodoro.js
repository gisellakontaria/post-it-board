import React, { useState, useEffect } from "react"

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval)
      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59)
          setMinutes(minutes - 1)
        } else {
          let minutes = 24
          let seconds = 59
          setSeconds(seconds)
          setMinutes(minutes)
        }
      } else {
        setSeconds(seconds - 1)
      }
    }, 1000)
  }, [seconds])

  const min = minutes < 10 ? `0${minutes}` : minutes
  const sec = seconds < 10 ? `0${seconds}` : seconds

  return (
    <div>
        {min}:{sec}
    </div>
  )
}