import React, { memo } from 'react';
import { Box } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import { loadingMessageStyles } from 'styles/containers/chatPageStyles';

function LoadingMessage() {
  return (
    <Box sx={loadingMessageStyles}>
      <ThreeDots
        height="30"
        width="40"
        radius="9"
        // color="#006faf"
        color="white"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible
      />
    </Box>
  );
}

export default memo(LoadingMessage);
