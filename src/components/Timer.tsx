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
    if (timer && timerStart && timerStart + timer * 1000 > currentTime) {
      setCurrentTime(new Date().getTime());
    }
  }, 1000);

  if (!timer || !timerStart) {
    return <div>--:--:--</div>;
  }

  const timeLeft = Math.max(0, timerStart + timer * 1000 - currentTime);
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
