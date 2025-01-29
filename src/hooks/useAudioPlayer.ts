import { Howl } from "howler";
import * as React from "react";

export function useAudioPlayer(soundUrl: string) {
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
    return () => {
      sound.current.unload();
    };
  }, []);

  return { isPlaying, volume, setVolume, togglePlay };
}
