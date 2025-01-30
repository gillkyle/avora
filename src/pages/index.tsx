import { motion } from "framer-motion";
import { Geist, Geist_Mono } from "next/font/google";
import { AudioInput } from "~/components/AudioInput";
import { ControlBar } from "~/components/ControlBar";
import GameOfLife from "~/components/GameOfLife";
import { Logo } from "~/components/Logo";
import { audioEvents } from "~/events/audioEvents";
import { useGlobalAudioPlayer } from "~/hooks/useGlobalAudioPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const {
    setGlobalAudioStatus,
    globalAudioStatus,
    timer,
    setTimer,
    timerStart,
  } = useGlobalAudioPlayer();

  const handleTimerSet = (milliseconds: number) => {
    console.log(`handleTimerSet() setting timer to ${milliseconds}ms`);
    setTimer(milliseconds);
    if (globalAudioStatus === "muted") {
      setGlobalAudioStatus("unmuted");
    }
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center min-h-screen pt-4 pb-2 px-12 font-[family-name:var(--font-geist-sans)] flex flex-col`}
    >
      <nav className="flex w-full justify-between pb-4">
        <div className="text-lg flex items-center gap-2">
          <Logo />
          avora · Sound Machine
        </div>
        <div className="text-lg">Kyle Gill</div>
      </nav>
      <div className="border ring ring-neutral-100 ring-offset-2 shadow-inner rounded-2xl bg-neutral-50 shadow-neutral-200 border-neutral-300 w-full h-full flex flex-1 flex-col">
        <main className="flex flex-col flex-1 h-full gap-8 row-start-2 justify-center items-center relative">
          <GameOfLife />
          <motion.div
            className="absolute inset-0 z-10 flex justify-center items-center rounded-2xl"
            // animate={
            //   globalAudioStatus === "unmuted"
            //     ? {
            //         backgroundColor: [
            //           "rgba(147, 197, 253, 0.5)",
            //           "rgba(219, 234, 254, 0.5)",
            //           "rgba(147, 197, 253, 0.5)",
            //         ],
            //       }
            //     : {
            //         backgroundColor: "rgba(219, 234, 254, 0.5)",
            //       }
            // }
            // transition={{
            //   duration: 3,
            //   ease: "easeInOut",
            //   repeat: globalAudioStatus === "unmuted" ? Infinity : 0,
            //   repeatType: "loop",
            // }}
          >
            <AudioInput
              onSubmit={(duration, soundIds) => {
                if (duration) {
                  setTimer(duration / 1000);
                }
                if (soundIds.length > 0) {
                  audioEvents.playMultipleSounds(soundIds);
                } else {
                  audioEvents.playMultipleSounds(["whiteRain", "brownNoise"]);
                }
              }}
            />
          </motion.div>
        </main>
      </div>
      <footer className="flex gap-6 flex-wrap items-center justify-center pt-2 w-full">
        <ControlBar
          timer={timer}
          timerStart={timerStart}
          setTimer={handleTimerSet}
        />
      </footer>
    </div>
  );
}
