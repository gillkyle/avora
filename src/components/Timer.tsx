import { useState } from "react";
import { useInterval } from "~/hooks/useInterval";

export function Timer({
  timer,
  timerStart,
}: {
  timer: number | null;
  timerStart: number | null;
}) {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  useInterval(() => {
    // Always update current time while timer is active
    if (timer && timerStart) {
      setCurrentTime(new Date().getTime());
    }
  }, 1000);

  if (!timer || !timerStart) {
    return <div>--:--:--</div>;
  }

  // Calculate time left in milliseconds
  const endTime = timerStart + timer * 1000;
  const timeLeft = Math.max(0, endTime - currentTime);

  // Only show timer if there's time remaining
  if (timeLeft === 0) {
    return <div>00:00:00</div>;
  }

  // Convert to hours, minutes, seconds
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div>
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  );
}
