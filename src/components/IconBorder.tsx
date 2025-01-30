import { Box, SxProps } from "@mui/material";

export function IconBorder({
  children,
  size = 20,
  customSx,
}: {
  children: React.ReactNode;
  size?: number;
  customSx?: SxProps;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "lg",
        color: "gray.500",
        backgroundColor: "gray.100",
        padding: 0.25,
        borderRadius: Math.floor(size / 10),
        border: (theme) => `1px solid ${theme.palette.gray[200]}`,
        minWidth: size,
        minHeight: size,
        ...customSx,
      }}
    >
      {children}
    </Box>
  );
}
