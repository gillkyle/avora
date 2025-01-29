# Sound Machine

TODOs
• bootstrap Next.js app npx create-next-app@latest
• set up shadcn npx shadcn@latest init
• install a couple relevant packages I'll probably need: npm install jotai howler react-icons framer-motion zod parse-duration ts-pattern @mui/material @emotion/react @emotion/styled
• set up the MUI theme provider (in src/theme?..)
• grab some assets I'll need and drop in the public folder
• layout the homepage, navbar, content, control bar
• navbar is just logo + name
• content is mainly just a form + some decorative stuff
• control bar is a play button, a timer, and a button to open the sound control panel
• add a centered <Form /> that is a single text input with a submit button
• parse in 2 directions, 1 with parse-duration to get time for a timer, if it returns NULL keep the timer off
• 1 with parsing from sound machines, if any keywords match then turn them on at 50% volume
• possibly parse numbers into volumes
• add sound sliders in a dialog from the control bar
• Build a couple components:
• useAudioPlayer
• useGlobalAudioPlayer
• sounds.tsx
• SoundSlider.tsx
• Timer.tsx
• useInterval
• generate some landing pages for Programmatic SEO?..
• \_**\_ sounds for babies
• \_\_** sounds to fall asleep
