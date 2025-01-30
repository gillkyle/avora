import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import {
  TbClock,
  TbPlayerPause,
  TbPlayerPlay,
  TbSettings,
} from "react-icons/tb";
import { SettingsDialog } from "~/components/SettingsDialog";
import useDisclosure from "~/hooks/useDisclosure";
import { useGlobalAudioPlayer } from "~/hooks/useGlobalAudioPlayer";
import { Timer } from "./Timer";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function ControlBar() {
  const [timer, setTimer] = useState<number | null>(null);
  const [timerStart, setTimerStart] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const { pauseAll, playMultiple, isMuted } = useGlobalAudioPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const settingsDisclosure = useDisclosure();

  function handlePlayPause() {
    if (isPlaying) {
      pauseAll();
      setIsPlaying(false);
    } else {
      // Play all sounds that were previously playing
      playMultiple(["waterfall", "whiteRain"]); // Example - you might want to track which sounds were playing
      setIsPlaying(true);
    }
  }

  function handleSetTimer() {
    setTimer(5000); // 5 seconds in milliseconds
    setTimerStart(Date.now());
  }

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
      <IconButton onClick={handlePlayPause} size="large">
        {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
      </IconButton>

      <Typography sx={{ minWidth: 60 }}>{formatTime(currentTime)}</Typography>

      <Timer timer={timer} timerStart={timerStart} />

      <IconButton onClick={handleSetTimer} size="large">
        <TbClock />
      </IconButton>

      <Button
        onClick={settingsDisclosure.onOpen}
        size="large"
        startIcon={<TbSettings />}
      >
        Settings
      </Button>
      <SettingsDialog disclosure={settingsDisclosure} />
    </Box>
  );
}
