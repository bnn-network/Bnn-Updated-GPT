import { waitForDebugger } from 'inspector'
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: '(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        gradient: {
          start: 'var(--gradient-start)',
          middle: 'var(--gradient-middle)',
          end: 'var(--gradient-end)'
        },
        results: {
          foreground: 'var(--results-foreground)'
        },
        text: {
          secondary: 'var(--text-secondary)'
        },
        modal: {
          inputBox: 'var(--modal-inputBox)',
          inputBoxSecondary: 'var( --modal-inputBox-secondary)',
          background: 'var( --modal-background)'
        },
        bdr: {
          borderPrimary: 'var( --borders-primary)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '1rem',
        '2xl': '1.5rem'
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }]
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em'
      },
      spacing: {
        '1.25': '0.3125rem',
        '3.75': '0.9375rem',
        '4.5': '1.125rem',
        '5': '1.25rem',
        '7.5': '1.875rem',
        '10': '2.5rem',
        '12.5': '3.125rem',
        '13.75': '3.4375rem',
        '128': '32rem',
        '144': '36rem'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      scale: {
        '110': '1.1'
      },
      opacity: {
        '80': '0.8'
      },
      width: {
        '5': '1.25rem'
      },
      height: {
        '5': '1.25rem'
      },
      transitionDuration: {
        '400': '400ms'
      },
      listStyleType: {
        disc: 'disc',
        decimal: 'decimal',
        circle: 'circle'
      },
      backgroundColor: {
        'code-bg': '#1e1e1e',
        'code-header': '#343541'
      },
      textColor: {
        'code-text': '#ffffff'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography')({
      className: 'prose',
      maxWidth: {
        prose: '80ch'
      }
    }),
    plugin(function ({ addBase }) {
      addBase({
        ul: { listStyleType: 'disc', paddingLeft: '1.5em', margin: '1em 0' },
        ol: { listStyleType: 'decimal', paddingLeft: '1.5em', margin: '1em 0' },
        li: { marginBottom: '0.5em' },
        '.dark ul': { listStyleType: 'circle' }
      })
    })
  ]
} satisfies Config

export default config
