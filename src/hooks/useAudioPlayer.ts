import { Howl } from "howler";
import * as React from "react";
import { AudioEvents } from "~/events/audioEvents";

export function useAudioPlayer(soundUrl: string, soundId: string) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);

  const sound = React.useRef<Howl>(
    new Howl({
      src: [soundUrl],
      volume: volume,
      loop: true,
    })
  );

  function play() {
    sound.current.play();
    setIsPlaying(true);
  }

  function pause() {
    sound.current.pause();
    setIsPlaying(false);
  }

  function togglePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  React.useEffect(() => {
    sound.current.volume(volume);
  }, [volume]);

  React.useEffect(() => {
    const unsubscribePlay = AudioEvents.subscribe("play", (event) => {
      if (event.soundId === soundId) {
        play();
      }
    });

    const unsubscribePause = AudioEvents.subscribe("pause", (event) => {
      if (event.soundId === soundId) {
        pause();
      }
    });

    const unsubscribePauseAll = AudioEvents.subscribe("pauseAll", () => {
      pause();
    });

    const unsubscribeVolume = AudioEvents.subscribe("volume", (event) => {
      if (event.soundId === "global") {
        setVolume(event.volume);
      }
    });

    return () => {
      sound.current.unload();
      unsubscribePlay();
      unsubscribePause();
      unsubscribePauseAll();
      unsubscribeVolume();
    };
  }, [soundId]);

  return { isPlaying, volume, setVolume, togglePlay };
}
