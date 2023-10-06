import React from 'react';
import { Box } from '@mui/material';
import { Grid } from 'react-loader-spinner';

function GlobalLoader() {
  return (
    <Box className="d-flex align-items-center justify-content-center vh-100">
      <Grid
        height="80"
        width="80"
        color="#006fac"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible
      />
    </Box>
  );
}

export default GlobalLoader;
