// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors:{
        'custom': 'hsl(11, 72%, 55%)',
      }
    },
  },
  plugins: [],
}
