const { createTheme } = require('@mui/material');

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Poppins, sans-serif',
    },

    pageTitle: {
      fontSize: '48px',
      fontWeight: 600,

      '@media (max-width: 991px)': {
        fontSize: '44px',
      },

      '@media (max-width: 768px)': {
        fontSize: '40px',
      },

      '@media (max-width: 576px)': {
        fontSize: '32px',
      },
    },
  },

  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          pageTitle: 'h1',
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },

  palette: {
    primary: {
      main: '#E902E6',
      contrastText: '#0C0B57',
    },
    secondary: {
      main: '#0EE7F6',
      contrastText: '#0C0B57',
    },
    whiteColor: {
      main: '#FFFFFF',
    },
    greyColor: {
      main: '#e3e3e3',
    },
  },
});

export default theme;
