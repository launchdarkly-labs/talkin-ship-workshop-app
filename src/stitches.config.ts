import { createStitches } from "@stitches/react";

export const stitches = createStitches({
  theme: {
    fonts: {
      display:
        "Sohne, Inter, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif",
      font2:
        "system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif"
    }
  }
});

export const globalStyles = stitches.globalCss({
  "@font-face": {
    fontFamily: "Sohne",
    src: "url('/fonts/sohne.otf')"
  }
});
