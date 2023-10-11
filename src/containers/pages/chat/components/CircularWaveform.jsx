import React, { memo } from 'react';
import { Box } from '@mui/material';

import staticCircle from 'assets/avatar-image-female.png';
import spectrumAnimation from 'assets/female-avatar-animation-lipsync.gif';
import { useChatBotContext } from '../context/ChatBotContext';

function CircularWaveform() {
  const { isSpeaking } = useChatBotContext();

  return (
    <Box
      sx={{
        background: `url(${
          isSpeaking ? spectrumAnimation : staticCircle
        }) center/contain no-repeat`,
        width: 400,
        height: 400,
        maxWidth: '100%',
        maxHeight: '100%',

        '@media screen and (max-width: 768px)': {
          width: 200,
          height: 200,
        },

        '@media screen and (min-height: 1700px) and (min-width: 1500px)': {
          width: 550,
          height: 550,
        },
      }}
    />
  );
}

export default memo(CircularWaveform);
