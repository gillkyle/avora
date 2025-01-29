import { z } from "zod";

const AudioEventSchema = z.object({
  soundId: z.string(),
  volume: z.number().min(0).max(1),
});

type AudioEventType = z.infer<typeof AudioEventSchema>;

type EventCallback = (event: AudioEventType) => void;

export class AudioEvents {
  private static listeners: Map<string, Set<EventCallback>> = new Map();

  static subscribe(eventName: string, callback: EventCallback): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    this.listeners.get(eventName)?.add(callback);

    return () => {
      this.listeners.get(eventName)?.delete(callback);
      if (this.listeners.get(eventName)?.size === 0) {
        this.listeners.delete(eventName);
      }
    };
  }

  private static emit(eventName: string, event: AudioEventType) {
    this.listeners.get(eventName)?.forEach((callback) => callback(event));
  }

  static playSound(soundId: string) {
    this.emit("play", { soundId, volume: 1 });
  }

  static playMultipleSounds(soundIds: string[]) {
    soundIds.forEach((soundId) => this.playSound(soundId));
  }

  static pauseSound(soundId: string) {
    this.emit("pause", { soundId, volume: 0 });
  }

  static pauseAllSounds() {
    this.emit("pauseAll", { soundId: "all", volume: 0 });
  }

  static setVolume(volume: number) {
    this.emit("volume", { soundId: "global", volume });
  }

  static cleanup() {
    this.listeners.clear();
  }
}
