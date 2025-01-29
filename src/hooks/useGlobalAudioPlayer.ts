import * as React from "react";
import { AudioEvents } from "~/events/audioEvents";

export function useGlobalAudioPlayer() {
  const [globalVolume, setGlobalVolume] = React.useState(0.5);
  const [isMuted, setIsMuted] = React.useState(false);

  function play(soundId: string) {
    AudioEvents.playSound(soundId);
  }

  function playMultiple(soundIds: string[]) {
    AudioEvents.playMultipleSounds(soundIds);
  }

  function pause(soundId: string) {
    AudioEvents.pauseSound(soundId);
  }

  function pauseAll() {
    AudioEvents.pauseAllSounds();
  }

  function setVolume(volume: number) {
    setGlobalVolume(volume);
    AudioEvents.setVolume(volume);
  }

  function muteAll() {
    if (isMuted) {
      setVolume(globalVolume);
    } else {
      setVolume(0);
    }
    setIsMuted(!isMuted);
  }

  React.useEffect(() => {
    return () => {
      pauseAll();
    };
  }, []);

  return {
    globalVolume,
    isMuted,
    play,
    playMultiple,
    pause,
    pauseAll,
    setVolume,
    muteAll,
  };
}
