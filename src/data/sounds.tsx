import { IconType } from "react-icons";
import {
  TbBug,
  TbBugFilled,
  TbCampfire,
  TbCircle,
  TbCircleDashed,
  TbCircleDotted,
  TbCircleFilled,
  TbDroplet,
  TbFountain,
  TbRipple,
  TbSubmarine,
  TbSunWind,
} from "react-icons/tb";
import { match } from "ts-pattern";
import { z } from "zod";

export const ALL_SOUNDS = {
  waterfall: {
    id: "waterfall",
    urls: ["/sounds/waterfall.mp3", "/sounds/waterfall.ogg"],
    name: "Waterfall",
    icon: TbFountain,
    color: "blue",
    keywords: [
      "waterfall",
      "water",
      "stream",
      "river",
      "creek",
      "brook",
      "cascade",
    ],
  },
  whiteRain: {
    id: "whiteRain",
    urls: ["/sounds/white-rain.mp3", "/sounds/white-rain.ogg"],
    name: "Rain",
    icon: TbDroplet,
    color: "blue",
    keywords: [
      "rain",
      "storm",
      "thunder",
      "lightning",
      "pouring",
      "shower",
      "drizzle",
    ],
  },
  forestWind: {
    id: "forestWind",
    urls: ["/sounds/forest-wind.mp3", "/sounds/forest-wind.ogg"],
    name: "Wind",
    icon: TbSunWind,
    color: "green",
    keywords: ["wind", "breeze", "air", "nature", "forest", "tree"],
  },
  underwater: {
    id: "underwater",
    urls: ["/sounds/underwater.mp3", "/sounds/underwater.ogg"],
    name: "Underwater",
    icon: TbSubmarine,
    color: "blue",
    keywords: ["underwater", "aquatic", "marine"],
  },
  waves: {
    id: "waves",
    urls: ["/sounds/ocean-waves.mp3", "/sounds/ocean-waves.ogg"],
    name: "Waves",
    icon: TbRipple,
    color: "blue",
    keywords: ["waves", "ocean", "sea", "aquatic", "marine", "aqua", "aquifer"],
  },
  campfire: {
    id: "campfire",
    urls: ["/sounds/campfire.mp3", "/sounds/campfire.ogg"],
    name: "Campfire",
    icon: TbCampfire,
    color: "red",
    keywords: [
      "campfire",
      "fire",
      "camp",
      "camping",
      "camping",
      "fireplace",
      "fire",
    ],
  },
  cicadas: {
    id: "cicadas",
    urls: ["/sounds/japanese-cicadas.mp3", "/sounds/japanese-cicadas.ogg"],
    name: "Cicadas",
    icon: TbBug,
    color: "yellow",
    keywords: [
      "cicadas",
      "cicada",
      "insect",
      "bug",
      "nature",
      "forest",
      "tree",
    ],
  },
  crickets: {
    id: "crickets",
    urls: ["/sounds/crickets.mp3", "/sounds/crickets.ogg"],
    name: "Crickets",
    icon: TbBugFilled,
    color: "yellow",
    keywords: [
      "crickets",
      "cricket",
      "insect",
      "bug",
      "nature",
      "forest",
      "tree",
    ],
  },
  whiteNoise: {
    id: "whiteNoise",
    urls: ["/sounds/white-noise.mp3", "/sounds/white-noise.ogg"],
    name: "White Noise",
    icon: TbCircleDotted,
    color: "gray",
    keywords: ["white noise", "white", "sound"],
  },
  grayNoise: {
    id: "grayNoise",
    urls: ["/sounds/gray-noise.mp3", "/sounds/gray-noise.ogg"],
    name: "Gray Noise",
    icon: TbCircleDashed,
    color: "gray",
    keywords: ["gray noise", "gray", "sound"],
  },
  brownNoise: {
    id: "brownNoise",
    urls: ["/sounds/brown-noise.mp3", "/sounds/brown-noise.ogg"],
    name: "Brown Noise",
    icon: TbCircle,
    color: "orange",
    keywords: ["brown noise", "brown", "sound"],
  },
  pinkNoise: {
    id: "pinkNoise",
    urls: ["/sounds/pink-noise.mp3", "/sounds/pink-noise.ogg"],
    name: "Pink Noise",
    icon: TbCircleFilled,
    color: "fuchsia",
    keywords: ["pink noise", "pink", "sound"],
  },
};
export const ALL_SOUNDS_LIST = Object.values(ALL_SOUNDS);
export type SoundId = keyof typeof ALL_SOUNDS;

export const soundMatcher = (soundId: SoundId) => {
  return match(soundId)
    .with("waterfall", () => ALL_SOUNDS.waterfall)
    .with("whiteRain", () => ALL_SOUNDS.whiteRain)
    .with("forestWind", () => ALL_SOUNDS.forestWind)
    .with("underwater", () => ALL_SOUNDS.underwater)
    .with("waves", () => ALL_SOUNDS.waves)
    .with("campfire", () => ALL_SOUNDS.campfire)
    .with("cicadas", () => ALL_SOUNDS.cicadas)
    .with("crickets", () => ALL_SOUNDS.crickets)
    .with("whiteNoise", () => ALL_SOUNDS.whiteNoise)
    .with("grayNoise", () => ALL_SOUNDS.grayNoise)
    .with("brownNoise", () => ALL_SOUNDS.brownNoise)
    .with("pinkNoise", () => ALL_SOUNDS.pinkNoise)
    .exhaustive();
};

// make a Zod schema for the sound object, as well as a list of sound objects
export const soundSchema = z.object({
  id: z.string(),
  urls: z.array(z.string()),
  name: z.string(),
  icon: z.custom<IconType>(),
  color: z.string(),
  keywords: z.array(z.string()),
});
export const SoundsSchema = z.array(soundSchema);
