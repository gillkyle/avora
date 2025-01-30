import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { TbX } from "react-icons/tb";
import { ALL_SOUNDS_LIST, SoundId } from "~/data/sounds";
import type { DisclosureProps } from "~/hooks/useDisclosure";
import { SoundSlider } from "./SoundSlider";

type SettingsDialogProps = {
  disclosure: Omit<DisclosureProps, "onToggle">;
};

export function SettingsDialog({ disclosure }: SettingsDialogProps) {
  return (
    <Dialog
      open={disclosure.isOpen}
      onClose={disclosure.onClose}
      maxWidth="xl"
      keepMounted
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "1rem",
          backgroundColor: "neutral.50",
          border: (theme) => `2px solid ${theme.palette.gray["300"]}`,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          fontSize: "xl",
        }}
      >
        Sound Settings
        <IconButton
          onClick={disclosure.onClose}
          sx={{
            color: "neutral.500",
            "&:hover": { color: "neutral.700" },
          }}
        >
          <TbX />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {ALL_SOUNDS_LIST.map((sound) => (
            <SoundSlider key={sound.id} soundId={sound.id as SoundId} />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
