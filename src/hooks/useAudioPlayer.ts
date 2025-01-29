import * as React from "react";

export function useAudioPlayer(soundUrl: string) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  return { isPlaying, volume, setVolume, togglePlay };
}
