import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { TbX } from "react-icons/tb";
import { ALL_SOUNDS_LIST, SoundId } from "~/data/sounds";
import type { DisclosureProps } from "~/hooks/useDisclosure";
import { useGlobalAudioPlayer } from "~/hooks/useGlobalAudioPlayer";
import { SoundSlider } from "./SoundSlider";

type SettingsDialogProps = {
  disclosure: Omit<DisclosureProps, "onToggle">;
};

export function SettingsDialog({ disclosure }: SettingsDialogProps) {
  const { globalVolume, setVolume } = useGlobalAudioPlayer();

  return (
    <Dialog
      open={disclosure.isOpen}
      onClose={disclosure.onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "1rem",
          backgroundColor: "neutral.50",
          border: "1px solid",
          borderColor: "neutral.300",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        Sound Settings
        <IconButton
          onClick={disclosure.onClose}
          size="small"
          sx={{
            color: "neutral.500",
            "&:hover": { color: "neutral.700" },
          }}
        >
          <TbX />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Stack spacing={2}>
          {ALL_SOUNDS_LIST.map((sound) => (
            <SoundSlider key={sound.id} soundId={sound.id as SoundId} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
