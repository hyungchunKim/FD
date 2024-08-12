import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    title: {
      xl: {
        bold: '24px'
      }
    },
    extend: {
      fontFamilies: {
        inter: "Inter",
      },
      lineHeights: {
        0: "AUTO",
        1: "140%",
        2: "28",
        3: "16",
      },
      fontWeights: {
        inter_0: "Semi Bold",
        inter_1: "Medium",
        inter_2: "Regular",
        inter_3: "Bold",
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

    },
  },
  plugins:[
    plugin(({addComponents, theme}) => addComponents({
      ".title-2xl-bold": {
        fontWeight: theme("fontWeights.inter_0"),
        fontSize: theme("fontSize.9")
      },
      ".title-2xl-medium": {
          fontWeight: theme("fontWeights.inter_1"),
          fontSize: theme("fontSize.9")
        },
      ".title-2xl-regular": {
          fontWeight: theme("fontWeights.inter_2"),
          fontSize: theme("fontSize.9")
        },
      ".title-xl-bold": {
          fontWeight: theme("fontWeights.inter_0"),
          fontSize: theme("fontSize.8")
        },
      ".title-xl-medium": {
          fontWeight: theme("fontWeights.inter_1"),
          fontSize: theme("fontSize.8")
        },
      ".title-xl-regular": {
          fontWeight: theme("fontWeights.inter_2"),
          fontSize: theme("fontSize.8")
        },
      ".title-md-bold": {
          fontWeight: theme("fontWeights.inter_0"),
          fontSize: theme("fontSize.7")
        },
      ".title-md-medium": {
          fontWeight: theme("fontWeights.inter_1"),
          fontSize: theme("fontSize.7")
        },
      ".title-md-regular": {
          fontWeight: theme("fontWeights.inter_2"),
          fontSize: theme("fontSize.7")
        },
      ".title-sm-bold": {
          fontWeight: theme("fontWeights.inter_0"),
          fontSize: theme("fontSize.6")
        },
      ".title-sm-medium": {
          fontWeight: theme("fontWeights.inter_1"),
          fontSize: theme("fontSize.6")
        },
      ".title-sm-regular": {
          fontWeight: theme("fontWeights.inter_2"),
          fontSize: theme("fontSize.6")
        },
      ".title-xs-bold": {
          fontWeight: theme("fontWeights.inter_0"),
          fontSize: theme("fontSize.4")
        },
      ".title-xs-medium": {
          fontWeight: theme("fontWeights.inter_1"),
          fontSize: theme("fontSize.4")
        },
      ".title-xs-regular": {
          fontWeight: theme("fontWeights.inter_2"),
          fontSize: theme("fontSize.4")
        },
    }))
  ]
};
export default config;
