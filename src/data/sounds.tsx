import type { IconType } from "react-icons";
import {
  TbBug,
  TbCampfire,
  TbCircle,
  TbCircleDot,
  TbDroplet,
  TbFountain,
  TbRipple,
  TbWind,
} from "react-icons/tb";
import { z } from "zod";

const SoundSchema = z.object({
  id: z.string(),
  url: z.string(),
  name: z.string(),
  icon: z.custom<IconType>(),
  color: z.string(),
  keywords: z.array(z.string()),
});

const SoundsListSchema = z.array(SoundSchema);

type Sound = z.infer<typeof SoundSchema>;

export const ALL_SOUNDS = {
  waterfall: {
    id: "waterfall",
    url: "/sounds/waterfall.mp3",
    name: "Waterfall",
    icon: TbFountain,
    color: "#60A5FA", // blue-400
    keywords: ["waterfall", "rushing", "water", "stream", "flow"],
  },
  whiteRain: {
    id: "whiteRain",
    url: "/sounds/white-rain.mp3",
    name: "White Rain",
    icon: TbDroplet,
    color: "#93C5FD", // blue-300
    keywords: ["rain", "drizzle", "shower", "precipitation"],
  },
  forestWind: {
    id: "forestWind",
    url: "/sounds/forest-wind.mp3",
    name: "Forest Wind",
    icon: TbWind,
    color: "#34D399", // emerald-400
    keywords: ["wind", "breeze", "forest", "leaves", "rustling"],
  },
  underwater: {
    id: "underwater",
    url: "/sounds/underwater.mp3",
    name: "Underwater",
    icon: TbRipple,
    color: "#38BDF8", // sky-400
    keywords: ["underwater", "submerged", "diving", "bubbles"],
  },
  waves: {
    id: "waves",
    url: "/sounds/waves.mp3",
    name: "Ocean Waves",
    icon: TbFountain,
    color: "#2DD4BF", // teal-400
    keywords: ["waves", "ocean", "sea", "beach", "surf"],
  },
  campfire: {
    id: "campfire",
    url: "/sounds/campfire.mp3",
    name: "Campfire",
    icon: TbCampfire,
    color: "#FB923C", // orange-400
    keywords: ["fire", "crackling", "burning", "camp", "warmth"],
  },
  cicadas: {
    id: "cicadas",
    url: "/sounds/cicadas.mp3",
    name: "Cicadas",
    icon: TbBug,
    color: "#4ADE80", // green-400
    keywords: ["cicadas", "insects", "summer", "nature"],
  },
  crickets: {
    id: "crickets",
    url: "/sounds/crickets.mp3",
    name: "Crickets",
    icon: TbBug,
    color: "#86EFAC", // green-300
    keywords: ["crickets", "insects", "night", "chirping"],
  },
  whiteNoise: {
    id: "whiteNoise",
    url: "/sounds/white-noise.mp3",
    name: "White Noise",
    icon: TbCircle,
    color: "#E5E7EB", // gray-200
    keywords: ["white noise", "static", "ambient", "background"],
  },
  grayNoise: {
    id: "grayNoise",
    url: "/sounds/gray-noise.mp3",
    name: "Gray Noise",
    icon: TbCircle,
    color: "#D1D5DB", // gray-300
    keywords: ["gray noise", "static", "ambient", "background"],
  },
  pinkNoise: {
    id: "pinkNoise",
    url: "/sounds/pink-noise.mp3",
    name: "Pink Noise",
    icon: TbCircle,
    color: "#FDA4AF", // rose-300
    keywords: ["pink noise", "static", "ambient", "background"],
  },
  brownNoise: {
    id: "brownNoise",
    url: "/sounds/brown-noise.mp3",
    name: "Brown Noise",
    icon: TbCircleDot,
    color: "#92400E", // amber-800
    keywords: ["brown noise", "static", "ambient", "background"],
  },
} as const;
export const ALL_SOUNDS_LIST = Object.values(ALL_SOUNDS);

export { SoundSchema, SoundsListSchema };
export type { Sound };
