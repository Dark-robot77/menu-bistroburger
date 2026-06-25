import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bistro: {
          bg: '#0F0A09',
          sidebar: '#08070A',
          surface: '#100C0B',
          red: '#E32024',
          orange: '#F26B30',
          green: '#2EAB3A',
        },
      },
    },
  },
  plugins: [],
}
export default config
