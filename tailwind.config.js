/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [
      {
        wijandev: {
          "primary": "#ffd60a",
          "secondary": "#ffc300",
          "accent": "#003566",
          "neutral": "#191A3E",
          "base-100": "#FFFFFF",
          "info": "#93c5fd",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#f87171",
        }
      }

    ]
  },
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  variants: {
    fill: ['hover', 'focus']
  },
  plugins: [require("daisyui")],
}

