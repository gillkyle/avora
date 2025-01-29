import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Sound Machine</title>
      </Head>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "neutral.900",
        }}
      >
        {/* Top Navigation */}
        <AppBar position="static" sx={{ bgcolor: "neutral.800" }}>
          <Toolbar>
            <Typography component="h1">Sound Machine</Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <main className="flex-1 p-6 ring-1 ring-neutral-800 m-4 rounded-lg">
          {/* Sound controls will go here */}
        </main>

        {/* Bottom Control Bar */}
        <Box
          sx={{
            p: 2,
            bgcolor: "neutral.800",
            borderTop: "1px solid",
            borderColor: "neutral.700",
          }}
        >
          Controls
          {/* Global controls will go here */}
        </Box>
      </Box>
    </>
  );
}
