const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "../../views/*.pejs",
    "../../views/user/*.pejs",
    "../../node_modules/flowbite/**/*.js"
  ],
  mode: 'jit',
  theme: {
    extend: {
      spacing: {
        '7.5': '1.8rem',
        '6.5': '1.6rem'
      },
      colors: {
        'main-bg-color': 'var(--main-bg-color)',
        'secondary-bg-color': 'var(--secondary-bg-color)',
        'bg-hover-color': 'var(--bg-hover-color)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'blue-accent-emphasis': 'var(--blue-accent-emphasis)',
        'blue-accent-muted': 'var(--blue-accent-muted)',
        'blue-accent-subtle': 'var(--blue-accent-subtle)'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
      })
    })
  ],
}
