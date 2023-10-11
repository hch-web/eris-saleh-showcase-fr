import React, { memo } from 'react';
import { Box } from '@mui/material';

import staticCircle from 'assets/avatar-image-female.png';
import spectrumAnimation from 'assets/female-avatar-animation-lipsync.gif';
import { getImageSpectrumStyles } from 'styles/containers/chatPageStyles';
import { useChatBotContext } from '../context/ChatBotContext';

function CircularWaveform() {
  const { isSpeaking } = useChatBotContext();

  return (
    <>
      <Box
        className={isSpeaking ? 'd-block' : 'd-none'}
        sx={getImageSpectrumStyles(spectrumAnimation)}
      />

      <Box
        className={!isSpeaking ? 'd-block' : 'd-none'}
        sx={getImageSpectrumStyles(staticCircle)}
      />
    </>
  );
}

export default memo(CircularWaveform);
