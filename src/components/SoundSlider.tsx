import {
  Box,
  CircularProgress,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { IconBorder } from "~/components/IconBorder";
import type { SoundId } from "~/data/sounds";
import { soundMatcher } from "~/data/sounds";
import { audioEvents } from "~/events/audioEvents";
import { useAudioPlayer } from "~/hooks/useAudioPlayer";

type SoundSliderProps = {
  soundId: SoundId;
};

export function SoundSlider({ soundId }: SoundSliderProps) {
  const sound = soundMatcher(soundId);
  const soundUrls = sound.urls;
  const { play, pause, volume, setVolume, isPlaying, status } =
    useAudioPlayer(soundUrls);
  console.log(isPlaying);

  useEffect(() => {
    // Subscribe to audio events
    const cleanup = audioEvents.addEventListener((event) => {
      if (event.soundId === sound.id) {
        console.log(`SoundSlider.tsx: event.type: ${event.type}`);
        switch (event.type) {
          case "play":
            play();
            break;
          case "pause":
            pause();
            break;
          case "setVolume":
            if (event.volume !== undefined) {
              setVolume(event.volume);
            }
            break;
        }
      }
    });

    return cleanup;
  }, [sound.id, play, pause, setVolume]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const isInactive = !isPlaying && status !== "loading";

  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.gray["200"]}`,
        backgroundColor: "background.paper",
        color: "gray.900",
        padding: 1,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <IconBorder
        size={40}
        customSx={{
          color: (theme: any) =>
            isInactive
              ? theme.palette?.gray["500"]
              : theme.palette?.[sound.color]["500"],
          backgroundColor: (theme: any) =>
            isInactive
              ? theme.palette?.gray["100"]
              : theme.palette?.[sound.color]["50"],
          borderColor: (theme: any) =>
            isInactive
              ? theme.palette?.gray["200"]
              : theme.palette?.[sound.color]["200"],
        }}
      >
        {sound.icon({})}
      </IconBorder>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              lineHeight: 1,
              transform: "translateY(2px)",
              opacity: isInactive ? 0.5 : 1,
            }}
          >
            {sound.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: "translateY(4px)",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              width: "5ch",
              fontWeight: 500,
              color: "gray.400",
              fontSize: "xs",
            }}
          >
            {volume}
            <span style={{ fontSize: "9px" }}>%</span>
          </Typography>
          <Slider
            value={volume}
            onChange={handleSliderChange}
            disabled={isInactive}
            aria-labelledby="sound-slider"
            sx={{
              opacity: isInactive ? 0.5 : 1,
              filter: isInactive ? "grayscale(0.5)" : "grayscale(0)",
              width: "100%",
              padding: "10px 0",
              "& .MuiSlider-thumb": {
                height: 16,
                width: 10,
                borderRadius: 0.5,
                backgroundColor: "background.paper",
                boxShadow: 1,
                border: (theme) => `1px solid ${theme.palette.gray["300"]}`,
                "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  boxShadow: "inherit",
                  outline: (theme) =>
                    `2px solid ${theme.palette.primary["subtle"]}`,
                },
                "&.Mui-active, &.Mui-focusVisible": {
                  outline: (theme) =>
                    `2px solid ${theme.palette.primary["subtle"]}`,
                },
                transition: "width 0.1s ease-in-out, height 0.1s ease-in-out",
                "&:hover": {
                  width: 11,
                  height: 18,
                },
                // adjust the pseudo after element to make it more rounded
              },
              "& .MuiSlider-track": {
                height: 6,
                backgroundColor: "primary.500",
              },
              "& .MuiSlider-rail": {
                height: 6,
                backgroundColor: "gray.200",
                border: (theme) => `1px solid ${theme.palette.gray["300"]}`,
              },
            }}
          />
        </Box>
      </Box>
      <IconButton
        onClick={() => {
          console.log(`SoundSlider.tsx: onClick() isPlaying: ${isPlaying}`);
          if (isPlaying) {
            pause();
          } else {
            play();
          }
        }}
        disabled={status === "loading"}
        disableRipple
        sx={(theme) => ({
          backgroundColor: "background.paper",
          border: (theme) => `1px solid ${theme.palette.gray["300"]}`,
          color: "gray.500",
          "&:hover": {
            backgroundColor: "action.hover",
          },
          "&.Mui-focusVisible": {
            outline: `3px solid ${theme.palette.primary.main}`,
          },
          height: 40,
          width: 40,
          transition:
            "outline 0.1s ease-in-out, background-color 0.1s ease-in-out",
          "&.Mui-disabled": {
            backgroundColor: "background.paper",
            border: (theme) => `1px solid ${theme.palette.gray["300"]}`,
            color: "gray.500",
          },
        })}
      >
        {status === "loading" ? (
          <CircularProgress size={24} color="inherit" />
        ) : isPlaying ? (
          <TbPlayerPauseFilled />
        ) : (
          <TbPlayerPlayFilled />
        )}
      </IconButton>
    </Box>
  );
}
