const data = {
  borderRadius: {
    sm: { value: 3, type: "borderRadius" },
    lg: { value: 5, type: "borderRadius" },
    rounded: {
      value: 30,
      type: "borderRadius",
      description: "둥근 모양일때 사용",
    },
  },
  light: {
    grey: {
      100: { value: "#FEFEFE", type: "color" },
      200: { value: "#F7F8F9", type: "color" },
      300: { value: "#646F6C", type: "color" },
      400: { value: "#374553", type: "color" },
      500: { value: "#161D24", type: "color" },
      "": { value: "#", type: "color" },
    },
    red: {
      100: { value: "#FFEEF1", type: "color" },
      200: { value: "#FF6F61", type: "color" },
      300: { value: "#E45141", type: "color" },
    },
    blue: {
      100: { value: "#E1F5FF", type: "color" },
      200: { value: "#7DD5FF", type: "color" },
      300: { value: "#0C356A", type: "color" },
    },
    white: { value: "#FFFFFF", type: "color" },
  },
  dark: {
    grey: {
      100: { value: "#121212", type: "color" },
      200: { value: "#2E363A", type: "color" },
      300: { value: "#999FA4", type: "color" },
      400: { value: "#C5C8CE", type: "color" },
      500: { value: "#FDFDFD", type: "color" },
    },
    blue: {
      100: { value: "#0077C8", type: "color" },
      200: { value: "#00A9FF", type: "color" },
      300: { value: "#0C356A", type: "color" },
    },
    red: {
      100: { value: "#D73F2F", type: "color" },
      200: { value: "#FF6557", type: "color" },
      300: { value: "#FFD3D6", type: "color" },
    },
    white: { value: "#FFFFFF", type: "color" },
  },
  thin: { value: 300, type: "fontWeights" },
  normal: { value: 400, type: "fontWeights" },
  bold: { value: 600, type: "fontWeights" },
  extrabold: { value: 800, type: "fontWeights" },
  fontSize: {
    xs: { value: "0.75rem", type: "fontSizes" },
    sm: { value: "1rem", type: "fontSizes" },
    lg: { value: "1.5rem", type: "fontSizes" },
    xl: { value: "1.75rem", type: "fontSizes" },
    "2xl": { value: "2rem", type: "fontSizes" },
    "3xl": { value: "3rem", type: "fontSizes" },
  },
  typography: {
    header: {
      fontWeight: { value: 600, type: "fontWeights" },
      fontSize: { value: "2.8rem", type: "fontSizes" },
      lineHeight: { value: "36px", type: "lineHeights" },
    },
    subHeader: {
      fontSize: { value: "2.4rem", type: "fontSizes" },
      lineHeight: { value: "32px", type: "lineHeights" },
      fontWeight: { value: 600, type: "fontWeights" },
    },
    body: {
      fontWeight: { value: 600, type: "fontWeights" },
      fontSize: { value: "1.6rem", type: "fontSizes" },
      lineHeight: { value: "24px", type: "lineHeights" },
    },
    caption: {
      fontWeight: { value: 500, type: "fontWeights" },
      fontSize: { value: "1.2rem", type: "fontSizes" },
      lineHeight: { value: "18px", type: "lineHeights" },
    },
  },
}

export type ObjectKeys<T extends Record<PropertyKey, unknown>> =
  `${Exclude<keyof T, symbol>}`

export function objectKeys<Type extends Record<PropertyKey, unknown>>(
  obj: Type,
): Array<ObjectKeys<Type>> {
  return Object.keys(obj) as Array<ObjectKeys<Type>>
}

export const basicColorToken: Record<
  string,
  { value: { base: string; _dark: string } }
> = objectKeys(data.light).reduce(
  (acc, colorKey) => {
    const a = objectKeys(data.light[colorKey])
    // objectKeys(core.light[colorKey]).forEach((numberKey) => {
    //   const num = numberKey as keyof (typeof core.light)[typeof colorKey]

    //   // Use type assertion to access 'value' property
    //   const lightValue = (core.light[colorKey][num] as { value: string })?.value
    //   const darkValue = (core.dark[colorKey][num] as { value: string })?.value

    //   if (lightValue && darkValue) {
    //     acc[`${colorKey}_${num}`] = {
    //       value: {
    //         base: lightValue,
    //         _dark: darkValue,
    //       },
    //     }
    //   }
    // })

    return acc
  },
  {} as Record<string, { value: { base: string; _dark: string } }>,
)
