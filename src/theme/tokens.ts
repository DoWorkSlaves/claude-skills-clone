/**
 * Design Tokens
 * Central configuration for all design values used throughout the application
 */

export const designTokens = {
  // Color palette - Light & Cheerful Theme
  colors: {
    light: {
      primary: '#FF6B9D', // Soft Pink
      secondary: '#FFB84D', // Warm Orange
      background: '#FFFBF5',
      surface: '#FFF5F7',
      text: {
        primary: '#2D3436',
        secondary: '#636E72',
        disabled: '#B2BEC3',
      },
      border: '#FFE4E9',
      error: '#FF6B81',
      success: '#6BCF7F',
      warning: '#FFB84D',
    },
    dark: {
      primary: '#FF85A6',
      secondary: '#FFC46D',
      background: '#2D3436',
      surface: '#36393B',
      text: {
        primary: '#FFFBF5',
        secondary: '#DFE6E9',
        disabled: '#B2BEC3',
      },
      border: '#4A4A4A',
      error: '#FF8FA3',
      success: '#7FDB91',
      warning: '#FFC46D',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      primary: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      code: '"Fira Code", "Courier New", monospace',
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
  },

  // Breakpoints (responsive)
  breakpoints: {
    mobile: 0,       // 0px - 599px
    tablet: 600,     // 600px - 1023px
    desktop: 1024,   // 1024px - 1439px
    wide: 1440,      // 1440px+
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  // Z-index
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },

  // Transitions
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
} as const;

export type DesignTokens = typeof designTokens;
