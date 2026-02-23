export const theme = {
  colors: {
    softBlack: '#12100f',
    charcoal: '#1d1a18',
    offWhite: '#f2eee6',
    brass: '#8f7a52'
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.875rem',
    md: '1.5rem',
    lg: '2.5rem',
    xl: '4rem',
    xxl: '6rem',
    section: '8rem'
  },
  typography: {
    display: 'clamp(3rem, 8vw, 7rem)',
    headline: 'clamp(2rem, 4vw, 3.5rem)',
    body: '1.05rem',
    small: '0.9rem',
    micro: '0.75rem'
  },
  containers: {
    narrow: '52rem',
    content: '68rem',
    wide: '84rem'
  },
  sectionPadding: {
    y: 'clamp(4rem, 10vw, 8rem)',
    x: 'clamp(1.25rem, 4vw, 3.5rem)'
  }
} as const;

export type Theme = typeof theme;
