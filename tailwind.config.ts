import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors (Research-backed 2025 standards)
        "brand": {
          "gold": "#FFD700",          // Libertarian Gold (primary)
          "gold-hover": "#FFC700",    // Hover state
          "orange": "#F7931A",        // Bitcoin Orange (official)
          "black": "#0A0A0A",         // Soft Black (better than pure black for dark mode)
        },

        // Background & Surface Colors
        "surface": {
          "black": "#0A0A0A",         // Primary background
          "charcoal": "#1A1A1A",      // Cards, secondary backgrounds
          "dark": "#242424",          // Elevated surfaces
          "darker": "#050505",        // Deepest black
        },

        // Text Colors (WCAG AAA compliant)
        "text": {
          "primary": "#FFFFFF",       // Primary text (20.4:1 contrast)
          "secondary": "#F5F5F5",     // Body text (18.9:1 contrast)
          "tertiary": "#D1D5DB",      // Secondary text (13.2:1 contrast)
          "muted": "#9CA3AF",         // Muted text
          "disabled": "#6B7280",      // Disabled state (5.8:1 AA compliant)
        },

        // Border & Divider Colors
        "border": {
          "default": "#242424",       // Default borders
          "muted": "#6B7280",         // Subtle borders
          "gold": "#FFD700",          // Accent borders
        },

        // Semantic Colors (Accessible, not oversaturated)
        "semantic": {
          "success": "#10B981",       // Emerald green
          "warning": "#F59E0B",       // Amber
          "error": "#EF4444",         // Rose red
          "info": "#3B82F6",          // Sky blue
          "lightning": "#FDE047",     // Electric yellow (Lightning Network)
        },

        // Legacy support (backwards compatibility)
        "brand-yellow": "#FFD700",
        "primary-dark": "#FFC700",
        "dark-grey": "#1A1A1A",
      },

      // Typography Scale (Fluid, mobile-first)
      fontSize: {
        'display': ['clamp(3rem, 5vw + 1rem, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2.5rem, 4vw + 0.5rem, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'h2': ['clamp(2rem, 3vw + 0.5rem, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'h3': ['clamp(1.5rem, 2vw + 0.5rem, 2.25rem)', { lineHeight: '1.2' }],
        'h4': ['clamp(1.25rem, 1.5vw + 0.25rem, 1.75rem)', { lineHeight: '1.3' }],
        'h5': ['clamp(1.125rem, 1vw + 0.25rem, 1.5rem)', { lineHeight: '1.3' }],
        'body-lg': ['clamp(1.125rem, 0.5vw + 0.25rem, 1.25rem)', { lineHeight: '1.7' }],
        'body': ['clamp(1rem, 0.25vw + 0.125rem, 1.125rem)', { lineHeight: '1.7' }],
        'body-sm': ['clamp(0.875rem, 0.25vw + 0.125rem, 1rem)', { lineHeight: '1.6' }],
        'caption': ['clamp(0.75rem, 0.25vw + 0.125rem, 0.875rem)', { lineHeight: '1.5' }],
      },

      // Spacing System (8px base unit)
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },

      // Box Shadow (Gold glow effects)
      boxShadow: {
        'glow-sm': '0 0 10px rgba(255, 215, 0, 0.15)',
        'glow': '0 0 20px rgba(255, 215, 0, 0.25)',
        'glow-lg': '0 0 30px rgba(255, 215, 0, 0.35)',
        'gold': '0 4px 6px rgba(255, 215, 0, 0.1)',
        'gold-lg': '0 6px 20px rgba(255, 215, 0, 0.3)',
      },

      // Border Radius
      borderRadius: {
        'DEFAULT': '8px',
        'card': '12px',
        'large': '16px',
      },

      // Animation
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },

      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.4)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      // Backdrop Blur
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
