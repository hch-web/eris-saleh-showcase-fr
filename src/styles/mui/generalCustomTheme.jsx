const { createTheme } = require('@mui/material');

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },

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
});

export default theme;
