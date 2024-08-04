import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'custom': '0px 13px 22px 0 rgba(251, 244, 237, 0.65), 0 6px 24px 0 rgba(251, 231, 222, 0.11)',
      },
      colors:{
        "orange-light":"#FBCBB6",
        "orange":"#fd6f4c",
        "light":"fcfbfa",

      },
      fontFamily: {
        merienda: ["var(--Merienda)"],
      },
    },
  },
  plugins: [],
};
export default config;
