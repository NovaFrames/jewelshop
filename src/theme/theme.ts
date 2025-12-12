// src/theme/theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#7d3c3c',
        light: '#a35656',
        dark: '#5c2c2c',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#d4af37',
        light: '#e8c766',
        dark: '#b8941f',
        contrastText: '#ffffff',
      },
      background: {
        default: '#ffffffff',
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#666666',
      },
      divider: 'rgba(125, 60, 60, 0.1)',
    },
    typography: {
      fontFamily: '"Playfair Display", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 700,
        fontSize: '3.5rem',
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 600,
        fontSize: '2.75rem',
      },
      h3: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 600,
        fontSize: '2.25rem',
      },
      h4: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 500,
        fontSize: '1.875rem',
      },
      h5: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 500,
        fontSize: '1.5rem',
      },
      h6: {
        fontFamily: '"Playfair Display", serif',
        fontWeight: 700,
        fontSize: '1.25rem',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollBehavior: 'smooth',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '8px',
            padding: '10px 24px',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(125, 60, 60, 0.2)',
            },
          },
          outlined: {
            backgroundColor: "#9f7e44",
            color: "white",
            borderRadius: 20,
            padding: "10px 24px",
            "&:hover": { backgroundColor: "transparent", color: "#9f7e44", borderColor: "#9f7e44" },
          }
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
    },
  })
);

export default theme;