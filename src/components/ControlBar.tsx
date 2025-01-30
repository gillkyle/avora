import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  TbClockHour4,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbSettings,
} from "react-icons/tb";
import { SettingsDialog } from "~/components/SettingsDialog";
import useDisclosure from "~/hooks/useDisclosure";
import { useGlobalAudioPlayer } from "~/hooks/useGlobalAudioPlayer";
import { Timer } from "./Timer";

const TIMER_SECONDS = 5;

export function ControlBar({
  timer,
  timerStart,
  setTimer,
}: {
  timer: number | null;
  timerStart: number | null;
  setTimer: (timer: number) => void;
}) {
  const { setGlobalAudioStatus, globalAudioStatus } = useGlobalAudioPlayer();
  const settingsDisclosure = useDisclosure();

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
        borderRadius: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "space-between",
          borderRadius: 99999,
          backgroundColor: "gray.50",
          padding: 0.5,
          border: (theme) => `1px solid ${theme.palette.gray["100"]}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={() => {
              setGlobalAudioStatus(
                globalAudioStatus === "muted" ? "unmuted" : "muted"
              );
            }}
            sx={{
              backgroundColor: "background.paper",
              boxShadow: 2,
              border: (theme) => `1px solid ${theme.palette.gray["300"]}`,
              borderRadius: 99999,
              padding: 1,
              "&:hover": {
                backgroundColor: "background.paper",
                filter: "brightness(0.97)",
              },
            }}
            disableRipple
          >
            {globalAudioStatus === "muted" ? (
              <TbPlayerPlayFilled size={24} />
            ) : (
              <TbPlayerPauseFilled size={24} />
            )}
          </IconButton>
        </Box>
        <Timer timer={timer} timerStart={timerStart} />
        <IconButton
          key={TIMER_SECONDS}
          onClick={() => setTimer(TIMER_SECONDS)}
          disableRipple
        >
          <TbClockHour4 size={24} />
          <Typography sx={{ ml: 0.5 }}>{TIMER_SECONDS}s</Typography>
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          onClick={settingsDisclosure.onOpen}
          size="large"
          startIcon={<TbSettings />}
        >
          Sound Settings
        </Button>
      </Box>
      <SettingsDialog disclosure={settingsDisclosure} />
    </Box>
  );
}
