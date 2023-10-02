import React from 'react';
import { Box } from '@mui/material';
import { Grid } from 'react-loader-spinner';

function GlobalLoader() {
  return (
    <Box>
      <Grid
        height="80"
        width="80"
        color="#00BFFF"
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
