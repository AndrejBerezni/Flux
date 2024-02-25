import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#ff5f00',
        brandDisabled: '#ff5f0099',
        primary: '#1a1a1a',
        secondary: '#828287',
        tertiary: '#c9c9cf',
        quaternary: '#f1f1f3',
        white: '#ffffff',
        gold: '#d2bf37',
        platinum: '#979392',
      },
    },
  },
  plugins: [],
}
export default config
