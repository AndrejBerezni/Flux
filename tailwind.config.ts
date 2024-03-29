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
        brandDarker: '#c24900',
        brandSecondary: '#FFFBAA',
        brandTertiary: '#F6E3FF',
        primary: '#1a1a1a',
        secondaryText: '#333333',
        secondary: '#828287',
        tertiary: '#c9c9cf',
        quaternary: '#f1f1f3',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
}
export default config
