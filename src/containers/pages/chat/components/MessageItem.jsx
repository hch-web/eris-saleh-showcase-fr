import React, { memo, useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';

import {
  messageResponseBtnStyles,
  messageStyles,
} from 'styles/containers/chatPageStyles';
import TypingEffect from 'shared/TypingEffect';
import { useChatBotContext } from '../context/ChatBotContext';

function MessageItem({ message, isQuery, timestamp, type, isLast, onRegenerate }) {
  const { isSpeaking, setSpeaking } = useChatBotContext();
  const [isAnimationCompleted, setAnimationCompleted] = useState(isQuery);
  const [isRegenerating, setRegenerating] = useState(false);
  const isAudio = type === 'audio';

  useEffect(() => {
    if (isAnimationCompleted) {
      setSpeaking(false);
    }
  }, [isAnimationCompleted]);

  const handleRegenerate = () => {
    setRegenerating(true);
    onRegenerate();
  };

  return (
    <>
      <Box sx={messageStyles(isQuery, isAudio)}>
        {isAudio && (
          <audio controls src={message}>
            <track kind="captions" />
          </audio>
        )}

        {/* TEXT MESSAGE BOX */}
        {isQuery && !isAudio ? (
          <Typography
            variant="body1"
            color={!isQuery ? 'secondary.main' : 'white'}
            textTransform="capitalize"
            fontSize={14}
          >
            {message}
          </Typography>
        ) : (
          <TypingEffect
            text={message}
            isCompleted={isAnimationCompleted}
            handleStop={() => setAnimationCompleted(true)}
          />
        )}

        {isAnimationCompleted && !isAudio && (
          <Typography
            variant="caption"
            color="lightgrey"
            textAlign="end"
            component="p"
            fontSize={11}
            mt={1}
          >
            {timestamp}
          </Typography>
        )}
      </Box>

      {!isQuery && isLast && (
        <Stack direction="row" spacing={2}>
          {(!isAnimationCompleted || isSpeaking) && (
            <Button
              variant="outlined"
              color="greyColor"
              sx={messageResponseBtnStyles}
              onClick={() => setAnimationCompleted(true)}
            >
              Stop
            </Button>
          )}

          {isAnimationCompleted && !isSpeaking && (
            <Button
              variant="outlined"
              color="greyColor"
              disabled={isRegenerating}
              sx={messageResponseBtnStyles}
              onClick={handleRegenerate}
            >
              Regenerate
            </Button>
          )}
        </Stack>
      )}
    </>
  );
}

MessageItem.propTypes = {
  message: propTypes.string.isRequired,
  isQuery: propTypes.bool.isRequired,
  timestamp: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  isLast: propTypes.bool.isRequired,
  onRegenerate: propTypes.func.isRequired,
};

export default memo(MessageItem);
