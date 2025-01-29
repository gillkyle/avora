import { Box, IconButton, Slider } from "@mui/material";
import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import { useAudioPlayer } from "~/hooks/useAudioPlayer";

type SoundSliderProps = {
  soundUrl: string;
  color: string;
  label: string;
};

export function SoundSlider({ soundUrl, color, label }: SoundSliderProps) {
  const { isPlaying, volume, togglePlay, setVolume } = useAudioPlayer(soundUrl);

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
        borderColor: isPlaying ? color : "transparent",
      }}
    >
      <Slider
        value={volume}
        onChange={(_, value) => setVolume(value as number)}
        min={0}
        max={1}
        step={0.01}
        aria-label={`${label} volume`}
        sx={{
          width: 120,
          color: isPlaying ? color : "primary.main",
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
          color: isPlaying ? color : "text.primary",
        }}
      >
        {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
      </IconButton>
    </Box>
  );
}
