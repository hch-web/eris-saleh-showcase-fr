import React, { memo, useEffect, useRef } from 'react';
import propTypes from 'prop-types';

import staticCircle from 'assets/avatar-image-female-3.png';
import spectrumAnimation from 'assets/female-avatar-animation-3.gif';
// import staticCircle from 'assets/avatar-image.png';
// import spectrumAnimation from 'assets/circle-avatar-animation-2.gif';
import { Box } from '@mui/material';
import { convertBase64ToBlob } from '../utilities/helpers';
import { useChatBotContext } from '../context/ChatBotContext';

function CircularWaveform({ message }) {
  const audioRef = useRef(null);
  const { isSpeaking, setSpeaking, isStopped, setStopped } = useChatBotContext();

  useEffect(() => {
    if (message?.audio) {
      const blob = convertBase64ToBlob(message.audio);
      const audio = new Audio(blob);
      audioRef.current = audio;

      audio.addEventListener('play', () => {
        if (isStopped) {
          setStopped(false);
        }

        setSpeaking(true);
      });

      audio.addEventListener('ended', () => {
        setSpeaking(false);
      });

      audioRef.current.play().then(() => {});
    }
  }, [message]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('isSpeaking', isSpeaking);
    if (isSpeaking && isStopped) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSpeaking(false);
    }
  }, [isSpeaking, audioRef.current, isStopped]);

  return (
    <Box
      sx={{
        background: `url(${
          isSpeaking ? spectrumAnimation : staticCircle
        }) center/contain no-repeat`,
        width: 300,
        height: 300,
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

CircularWaveform.propTypes = {
  message: propTypes.object,
};

CircularWaveform.defaultProps = {
  message: null,
};

export default memo(CircularWaveform);
