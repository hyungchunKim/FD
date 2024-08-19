import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blueviolet: "#9747ff",
        "background-gray-light": "#f1f1f1",
        "text-gray-defalt": "#969696",
        "text-gray-dark": "#3f3f3f",
        "background-purple-light": "#faf8ff",
        "primary-puple-500": "#6100ff",
        "background-red-light": "#ffefef",
        "accent-red": "#ff6d6d",
        primary: {
          500: "#6100ff",
          400: "#883eff",
          300: "#a66fff",
          200: "#c9a8ff",
          100: "#e0ceff",
          50: "#f2ebff",
        },
        black: "#000000",
        white: "#ffffff",
        bg: {
          primary_light: "#faf8ff",
          primary_dark: "#e3e1e7",
          red_light: "#ffefef",
          gray_light: "#f1f1f1",
          gray_dark: "#c2c2c2",
        },
        line: {
          default: "#c3c3c3",
          light: "#e6e6e6",
          dark: "#adadad",
        },
        text: {
          default: "#969696",
          light: "#d6d6d6",
          dark: "#3f3f3f",
        },
        accent: {
          green: "#00c308",
          red: "#ff6d6d",
          blue: "#6db0ff",
          orange: "#ffd542",
        },
        neutral: {
          100: "#030303",
          90: "#1a1a1a",
          80: "#333333",
          70: "#4d4d4d",
          60: "#666666",
          50: "#808080",
          40: "#999999",
          30: "#b3b3b3",
          20: "#cccccc",
          10: "#e6e6e6",
          5: "#f3f3f3",
        },
      },
      buttonShadow: {
        color: "#00000040",
        type: "buttonShadow",
        x: 0,
        y: 2,
        blur: 12,
        spread: 0,
      },
      fontFamilies: {
        inter: "Inter",
      },
      lineHeights: {
        0: "AUTO",
        1: "140%",
        2: "28",
        3: "16",
      },
      fontWeight: {
        inter_0: "600",
        inter_1: "500",
        inter_2: "400",
      },
      fontSize: {
        0: "12px",
        1: "14px",
        2: "16px",
        3: "18px",
        4: "20px",
        5: "24px",
        6: "28px",
        7: "32px",
        8: "60px",
        9: "80px",
      },
      letterSpacing: {
        0: "1.5%",
        1: "0%",
        2: "-1%",
      },
      paragraphSpacing: {
        0: "0",
      },
      backgroundImage: {
        "main-bg": "url('/home_background.svg')",
        "main-rect-icon": "url('/home_rect_icon.svg')",
        "footer-bg": "url('/footer_background.svg')",
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) =>
      addComponents({
        ".title-2xl-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.9"),
        },
        ".title-2xl-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.9"),
        },
        ".title-2xl-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.9"),
        },
        ".title-xl-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.8"),
        },
        ".title-xl-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.8"),
        },
        ".title-xl-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.8"),
        },
        ".title-md-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.7"),
        },
        ".title-md-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.7"),
        },
        ".title-md-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.7"),
        },
        ".title-sm-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.6"),
        },
        ".title-sm-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.6"),
        },
        ".title-sm-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.6"),
        },
        ".title-xs-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.4"),
        },
        ".title-xs-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.4"),
        },
        ".title-xs-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.4"),
        },
        ".subtitle-md-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.5"),
        },
        ".subtitle-md-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.5"),
        },
        ".subtitle-md-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.5"),
        },
        ".subtitle-sm-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.3"),
        },
        ".subtitle-sm-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.3"),
        },
        ".subtitle-sm-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.3"),
        },
        ".caption-md-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.0"),
        },
        ".caption-md-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.0"),
        },
        ".caption-md-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.0"),
        },
        ".caption-xl-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.2"),
        },
        ".caption-xl-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.2"),
        },
        ".caption-xl-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.2"),
        },
        ".label-md-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.2"),
        },
        ".label-md-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.2"),
        },
        ".label-md-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.2"),
        },
        ".label-xs-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.1"),
        },
        ".label-xs-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.1"),
        },
        ".label-xs-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.1"),
        },
        ".body-md-bold": {
          fontWeight: theme("fontWeight.inter_0"),
          fontSize: theme("fontSize.2"),
        },
        ".body-md-medium": {
          fontWeight: theme("fontWeight.inter_1"),
          fontSize: theme("fontSize.2"),
        },
        ".body-md-regular": {
          fontWeight: theme("fontWeight.inter_2"),
          fontSize: theme("fontSize.2"),
        },
      })
    ),
  ],
};

export default config;
