import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      brand: '#ff5f00',
      brandDisabled: '#ff5f0099',
      primary: '#1a1a1a',
      secondary: '#828287',
      tertiary: '#c9c9cf',
      white: '#ffffff',
    },
  },
  plugins: [],
}
export default config
