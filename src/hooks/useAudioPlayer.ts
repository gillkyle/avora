import { Howl } from "howler";
import { useEffect, useRef, useState } from "react";

type AudioStatus = "idle" | "loading" | "success";

const DEFAULT_SOUND_SETTINGS = {
  vol: 50,
};

export function useAudioPlayer(soundUrls: Array<string>) {
  const [renderCount, setRenderCount] = useState(0);
  const [howl1, setHowl1] = useState<Howl | null>(null);
  const [howl2, setHowl2] = useState<Howl | null>(null);
  const [volumeLevel, setVolumeLevel] = useState(DEFAULT_SOUND_SETTINGS.vol);
  const defaultHowlVolumeLevel = DEFAULT_SOUND_SETTINGS.vol
    ? DEFAULT_SOUND_SETTINGS.vol / 100
    : 0.5;
  const [status, setStatus] = useState<AudioStatus>("idle");
  const startHowl2Timeout = useRef<any>(null);

  const isPlaying = (howl1?.playing() || howl2?.playing()) ?? false;

  const initializeHowls = () => {
    setStatus("loading");
    const newHowl1: Howl = new Howl({
      src: soundUrls,
      loop: true,
      volume: defaultHowlVolumeLevel,
      onload: () => {
        setHowl1(newHowl1);
        initializeHowl2(newHowl1);
      },
      onloaderror: () => setStatus("idle"),
    });
  };

  const initializeHowl2 = (howl1: Howl) => {
    const newHowl2: Howl = new Howl({
      src: soundUrls,
      loop: true,
      volume: defaultHowlVolumeLevel,
      onload: () => {
        setHowl2(newHowl2);
        setStatus("success");
        playAudio(howl1, newHowl2);
      },
      onloaderror: () => setStatus("idle"),
    });
  };

  const playAudio = (howl1: Howl, howl2: Howl) => {
    console.log(`playAudio() starting the first howl instance`);
    howl1.play();
    howl2.stop();

    // Schedule Howl2 to start halfway through Howl1
    const secondsTillHowl2Starts = (howl1.duration() / 2) * 1000;
    console.log(
      `playAudio() seconds till Howl2 starts: ${secondsTillHowl2Starts}`
    );
    startHowl2Timeout.current = setTimeout(() => {
      howl2.play();
    }, secondsTillHowl2Starts);
    setRenderCount(renderCount + 1);
  };

  const play = () => {
    // make sure Howler is not muted
    Howler.mute(false);
    if (status === "idle") {
      console.log("Initializing Howls from useAudioPlayer");
      initializeHowls();
    } else if (status === "success" && howl1 && howl2) {
      console.log("play() Playing audio from useAudioPlayer");
      playAudio(howl1, howl2);
    }
  };

  const pause = () => {
    console.log("pause() Pausing this sound from useAudioPlayer");
    clearTimeout(startHowl2Timeout.current);
    howl1?.seek(0);
    howl2?.seek(0);
    howl1?.pause();
    howl2?.pause();
    setRenderCount(renderCount + 1);
  };

  const setVolume = (volume: number) => {
    console.log(`setVolume() Setting volume from useAudioPlayer: ${volume}`);
    howl1?.volume(volume / 100);
    howl2?.volume(volume / 100);
    setVolumeLevel(volume);
  };

  useEffect(() => {
    return () => {
      console.log(`cleanup of howl2, and unloading instances`);
      clearTimeout(startHowl2Timeout.current);
      howl1?.unload();
      howl2?.unload();
    };
  }, []);

  return { play, pause, volume: volumeLevel, setVolume, isPlaying, status };
}
