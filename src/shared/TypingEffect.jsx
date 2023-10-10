import React, { memo, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import propTypes from 'prop-types';

function TypingEffect({ text, isCompleted, handleStop }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollEnabled, setAutoScrollEnabled] = useState(true);

  useEffect(() => {
    if (text && currentIndex < text?.length && !isCompleted) {
      const timer = setTimeout(() => {
        setDisplayText(prevState => prevState + text[currentIndex]);
        setCurrentIndex(prevState => prevState + 1);
      }, 30);

      return () => {
        clearTimeout(timer);
      };
    }

    handleStop();

    return () => {};
  }, [currentIndex, text, isCompleted]);

  useEffect(() => {
    const contEl = document.getElementById('chatbot-cont-wrapper');
    const invisibleEL = document.getElementById('_end-block-message');

    if (isAutoScrollEnabled) {
      invisibleEL.scrollIntoView();
    }

    const handleScroll = () => {
      if (contEl.scrollHeight - contEl.scrollTop > contEl.clientHeight + 5) {
        setAutoScrollEnabled(false);
      }
    };

    contEl.addEventListener('scroll', handleScroll);

    return () => {
      contEl.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex]);

  return (
    <Box>
      <Typography
        variant="body1"
        className="message"
        color="secondary.main"
        fontSize={14}
        whiteSpace="pre-line"
        sx={{ wordBreak: 'break-word' }}
      >
        {displayText}
      </Typography>
    </Box>
  );
}

TypingEffect.propTypes = {
  isCompleted: propTypes.bool.isRequired,
  handleStop: propTypes.func.isRequired,
  text: propTypes.string,
};

TypingEffect.defaultProps = {
  text: '',
};

export default memo(TypingEffect);
