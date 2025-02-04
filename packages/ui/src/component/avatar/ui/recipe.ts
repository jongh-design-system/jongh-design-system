import { sva } from "@styled-system/css"

export const recipe = sva({
  slots: ["root", "image", "fallback"],
  base: {
    root: {
      position: "relative",
      display: "flex",
      h: "12",
      w: "12",
      flexShrink: "0",
      overflow: "hidden",
      rounded: "full",
    },
    image: {
      aspectRatio: "square",
      h: "full",
      w: "full",
    },
    fallback: {
      display: "flex",
      h: "full",
      w: "full",
      alignItems: "center",
      justifyContent: "center",
      rounded: "full",
      bg: "muted",
    },
  },
})
