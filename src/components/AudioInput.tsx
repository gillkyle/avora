import { Button } from "@mui/material";
import parse from "parse-duration";
import * as React from "react";
import { ALL_SOUNDS_LIST, SoundId } from "~/data/sounds";

export function AudioInput({
  onSubmit,
}: {
  onSubmit: (duration: number | null, soundIds: SoundId[]) => void;
}) {
  // this is a text input with a submit button the text input is controlled and parsed into sound ids and durations
  // the submit button is a button that will trigger the audio events to play the sounds
  const [input, setInput] = React.useState("");
  console.log(input);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedDuration = parse(input);
    const parsedSoundIds = parseInputForSounds(input);
    console.log({ duration: parsedDuration, soundIds: parsedSoundIds });

    onSubmit(parsedDuration, parsedSoundIds);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row ring-2 ring-neutral-100 rounded-xl gap-2 p-2 bg-white shadow-md border-neutral-300 border ring-offset-1 text-lg"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Brown noise for 5 minutes..."
        className="flex-grow outline-none px-2 min-w-[275px]"
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}

// look through the input for the exact sound ID or keywords and return the sound IDs that matched
function parseInputForSounds(input: string) {
  const soundIds = ALL_SOUNDS_LIST.map((sound) => sound.id);
  const inputWords = input.split(/\s+/);
  const matchedSoundIds = soundIds.filter((soundId) =>
    inputWords.includes(soundId)
  );
  // also try and match the keywords to sounds, and return the sound IDs that had a keyword match
  const matchedSoundsFromKeywords = ALL_SOUNDS_LIST.filter((sound) => {
    return inputWords.some((word) => sound.keywords.includes(word));
  });
  return [
    ...matchedSoundIds,
    ...matchedSoundsFromKeywords.map((sound) => sound.id),
  ] as Array<SoundId>;
}
