import { Box, IconButton, Typography } from "@mui/material";
import { TbPlayerPause, TbPlayerPlay, TbSettings } from "react-icons/tb";

type ControlBarProps = {
  isPlaying: boolean;
  onPlayPause: () => void;
  onOpenSettings: () => void;
  currentTime: number;
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function ControlBar({
  isPlaying,
  onPlayPause,
  onOpenSettings,
  currentTime,
}: ControlBarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: 1,
        bgcolor: "background.paper",
      }}
    >
      <IconButton onClick={onPlayPause} size="large">
        {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
      </IconButton>

      <Typography sx={{ minWidth: 60 }}>{formatTime(currentTime)}</Typography>

      <IconButton onClick={onOpenSettings} size="large">
        <TbSettings />
      </IconButton>
    </Box>
  );
}
