import { Box, IconButton, Slider } from "@mui/material";
import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import type { SoundId } from "~/data/sounds";
import { soundMatcher } from "~/data/sounds";
import { useAudioPlayer } from "~/hooks/useAudioPlayer";

type SoundSliderProps = {
  soundId: SoundId;
};

export function SoundSlider({ soundId }: SoundSliderProps) {
  const sound = soundMatcher(soundId);
  const { isPlaying, volume, togglePlay, setVolume } = useAudioPlayer(
    sound.urls[0],
    soundId
  );
  const Icon = sound.icon;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: 1,
        bgcolor: "background.paper",
        border: 2,
        borderColor: isPlaying ? sound.color : "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: isPlaying ? sound.color : "text.primary",
        }}
      >
        <Icon />
        <span>{sound.name}</span>
      </Box>

      <Slider
        value={volume}
        onChange={(_, value) => setVolume(value as number)}
        min={0}
        max={1}
        step={0.01}
        aria-label={`${sound.name} volume`}
        sx={{
          width: 120,
          color: isPlaying ? sound.color : "primary.main",
          "& .MuiSlider-thumb": {
            width: 12,
            height: 12,
          },
        }}
      />

      <IconButton
        onClick={togglePlay}
        size="small"
        sx={{
          color: isPlaying ? sound.color : "text.primary",
        }}
      >
        {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
      </IconButton>
    </Box>
  );
}
