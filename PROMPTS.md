- home page

```
pages/index.tsx build a layout that is one top navbar, a large flex container that fills the whole rest of the screen, and a control bar at the bottom.

Put a tailwind ring on the <main> content section in the middle and use neutral colors.
```

- sounds schemas

```
Create an ALL_SOUNDS list that includes a sound ID, and a series of strict keys inside it that can be used throughout the app. It should have:
- id
- a url to the sound asset
- a name for display
- an icon from the react-icons/tb package, ie Tabler icons
- a color
- keywords, that can be used for matching and searching

I have the following sound IDs:
- waterfall, whiteRain, forestWind, underwater, waves, campfire, cicadas, crickets, whiteNoise, grayNoise, pinkNoise, brownNoise.

Also please create Zod schemas that can parse a sound using the same keys, and infer types from them.
```

- individual audio engine hooks

```
use Howler.js to setup a useAudioPlayer React hook, it should have a few functions as a part of it:
- play
- pause
- setVolume
```

- global audio engine hook

```
use Howler.js to create a global useGlobalAudioPlayer hook, that can override and set all child audio players. It should share similar functions to the audio player hook like:
- play
- pause
- setVolume
- muteAll

Use custom event handlers to trigger and pass data across components, instead of using React Context or something like it. Put it in a file src/events/audioEvents.ts with a class implementing these functions:
- playMultipleSounds
- setVolume
- pauseAllSounds
- pauseSound
- playSound
- addEventListener
- removeEventListener
```

- sound slider component

```
create a SoundSlider component using the audio player hook. It should use MUI components like <Slider /> and <Box /> and be styled with the Sx prop. There should be a button on the right that toggles between play and pause based on the state returned by the audio player hook.

It should change color when it's on to match the color from the sounds list.
```
