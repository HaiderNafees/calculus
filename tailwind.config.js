/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        'accent-ink': 'var(--accent-ink)',
        signal: 'var(--signal)',
        'signal-soft': 'var(--signal-soft)',
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
