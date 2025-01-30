import { Howl, Howler } from "howler";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { audioEvents } from "~/events/audioEvents";

const statusAtom = atom<"muted" | "unmuted">("muted");
// this is stored in seconds
const timerAtom = atom<number | null>(null);
const timerStartAtom = atom<number | null>(null);

export function useGlobalAudioPlayer() {
  const status = useAtomValue(statusAtom);
  const setStatus = useSetAtom(statusAtom);
  // const [timer, setTimer] = useState<number | null>(null);
  const timer = useAtomValue(timerAtom);
  const setTimer = useSetAtom(timerAtom);
  const timerStart = useAtomValue(timerStartAtom);
  const setTimerStart = useSetAtom(timerStartAtom);

  const originalHowlPlay = Howl.prototype.play;
  const originalHowlStop = Howl.prototype.stop;
  const activeSounds = new Set<Howl>();

  function setTimerHandler(timer: number) {
    console.log(
      `setTimerHandler() setting timer start to ${new Date().getTime()} for ${timer}ms`
    );
    setTimerStart(new Date().getTime());
    setTimer(timer);
  }

  const pauseAll = useCallback(() => {
    console.log(`pauseAll() pausing all sounds by muting Howler`);
    Howler.mute(true);
    audioEvents.pauseAllSounds();
    setStatus("muted");
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "paused";
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (timer !== null) {
      timeoutId = setTimeout(() => {
        console.log("Timer complete, pausing all sounds");
        pauseAll();
        setGlobalAudioStatus("muted");
        // wipe out everything in Howler and the audioEvents set
        Howler.stop();
        audioEvents.pauseAllSounds();
        setTimer(null);
      }, timer * 1000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timer, pauseAll]);

  useEffect(() => {
    console.log(`useEffect() initializing media session`);
    const initializeMediaSession = () => {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: "Sound Machine",
          artist: "Kyle Gill",
        });

        navigator.mediaSession.setActionHandler("play", () =>
          setGlobalAudioStatus("unmuted")
        );
        navigator.mediaSession.setActionHandler("pause", () =>
          setGlobalAudioStatus("muted")
        );
      }
    };

    Howl.prototype.play = function (...args) {
      const result = originalHowlPlay.apply(this, args);
      if (this.playing()) {
        activeSounds.add(this);
      }
      initializeMediaSession();
      return result;
    };

    Howl.prototype.stop = function (...args) {
      const result = originalHowlStop.apply(this, args);
      activeSounds.delete(this);
      return result;
    };
  }, []);

  function setGlobalAudioStatus(status: "muted" | "unmuted") {
    console.log(
      `setGlobalAudioStatus() setting global audio status to ${status}`
    );
    if (status === "muted") {
      // emit a pause all event
      audioEvents.pauseAllSounds();
      Howler.mute(true);
      if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = "paused";
      }
    } else {
      Howler.mute(false);
      if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = "playing";
      }
    }
    setStatus(status);
  }

  return {
    globalAudioStatus: status,
    setGlobalAudioStatus,
    timer,
    setTimer: setTimerHandler,
    timerStart,
  };
}
