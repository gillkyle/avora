import { Geist, Geist_Mono } from "next/font/google";
import { ControlBar } from "~/components/ControlBar";
import { Logo } from "~/components/Logo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} items-center justify-items-center min-h-screen p-4 px-12 font-[family-name:var(--font-geist-sans)] flex flex-col`}
    >
      <nav className="flex w-full justify-between pb-4">
        <div className="text-lg flex items-center gap-2">
          <Logo />
          avora · Sound Machine
        </div>
        <div className="text-lg">Kyle Gill</div>
      </nav>
      <div className="border ring ring-neutral-100 ring-offset-2 shadow-inner rounded-2xl bg-neutral-50 shadow-neutral-200 border-neutral-300 w-full h-full flex flex-1 flex-col">
        <main className="flex flex-col flex-1 h-full gap-8 row-start-2 justify-center items-center">
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter text..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Submit
            </button>
          </form>
        </main>
      </div>
      <footer className="flex gap-6 flex-wrap items-center justify-center pt-4">
        <ControlBar />
      </footer>
    </div>
  );
}
