import { ALL_SOUNDS_LIST, SoundId } from "~/data/sounds";

type AudioEventType = "play" | "pause" | "setVolume";

type AudioEvent = {
  type: AudioEventType;
  soundId: SoundId;
  volume?: number;
};

type AudioEventListener = (event: AudioEvent) => void;

class AudioEventEmitter {
  private static instance: AudioEventEmitter;
  private listeners: AudioEventListener[] = [];

  private constructor() {}

  static getInstance(): AudioEventEmitter {
    if (!AudioEventEmitter.instance) {
      AudioEventEmitter.instance = new AudioEventEmitter();
    }
    return AudioEventEmitter.instance;
  }

  addEventListener(listener: AudioEventListener) {
    this.listeners.push(listener);
    return () => this.removeEventListener(listener);
  }

  removeEventListener(listener: AudioEventListener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  emit(event: AudioEvent) {
    this.listeners.forEach((listener) => listener(event));
  }

  // Helper methods for common operations
  playSound(soundId: SoundId) {
    this.emit({ type: "play", soundId });
  }

  pauseSound(soundId: SoundId) {
    this.emit({ type: "pause", soundId });
  }

  pauseAllSounds() {
    // loop through all sounds and pause them
    for (const sound of ALL_SOUNDS_LIST) {
      this.pauseSound(sound.id as SoundId);
    }
  }

  setVolume(soundId: SoundId, volume: number) {
    this.emit({ type: "setVolume", soundId, volume });
  }

  // Play multiple sounds at once
  playMultipleSounds(soundIds: SoundId[]) {
    soundIds.forEach((soundId) => this.playSound(soundId));
  }
}

export const audioEvents = AudioEventEmitter.getInstance();
