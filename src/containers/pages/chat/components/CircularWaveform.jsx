import React, { memo, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { Box } from '@mui/material';

import staticCircle from 'assets/avatar-image-female.png';
import spectrumAnimation from 'assets/female-avatar-animation-lipsync.gif';
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
      audio.load();

      audio.addEventListener('play', () => {
        if (isStopped) {
          setStopped(false);
        }

        setSpeaking(true);
      });

      audio.addEventListener('ended', () => {
        setSpeaking(false);
      });
      // eslint-disable-next-line no-console
      audio.play().catch(err => console.log(err));
    }
  }, [message]);

  useEffect(() => {
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
        width: 400,
        height: 400,
        maxWidth: '100%',
        maxHeight: '100%',

        '@media screen and (max-width: 768px)': {
          width: 350,
          height: 350,
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
