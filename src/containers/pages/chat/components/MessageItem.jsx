import React, { memo, useMemo, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';

import {
  messageResponseBtnStyles,
  messageStyles,
} from 'styles/containers/chatPageStyles';
import TypingEffect from 'shared/TypingEffect';
import { useChatBotContext } from '../context/ChatBotContext';

function MessageItem({ message, isQuery, timestamp, type, isLast, onRegenerate }) {
  const { isSpeaking, setStopped } = useChatBotContext();
  const [isAnimationCompleted, setAnimationCompleted] = useState(false);
  const [isRegenerating, setRegenerating] = useState(false);
  const isAudio = type === 'audio';

  const handleRegenerate = () => {
    setRegenerating(true);
    onRegenerate();
  };

  const handleStopResponse = () => {
    setAnimationCompleted(true);
    setStopped(true);
  };

  const isTimestamps = useMemo(() => {
    if (isQuery && !isAudio) {
      return true;
    }

    if (!isQuery && isAnimationCompleted) {
      return true;
    }

    return false;
  }, [isAnimationCompleted, isQuery]);

  return (
    <>
      <Box sx={messageStyles(isQuery, isAudio)}>
        {isAudio && (
          <audio controls src={message}>
            <track kind="captions" />
          </audio>
        )}

        {/* TEXT MESSAGE BOX */}
        {!isAudio &&
          (isQuery ? (
            <Typography
              variant="body1"
              color={!isQuery ? 'secondary.main' : 'white'}
              fontSize={14}
              whiteSpace="pre-line"
              sx={{ wordBreak: 'break-word' }}
            >
              {message}
            </Typography>
          ) : (
            <TypingEffect
              text={message}
              isCompleted={isAnimationCompleted}
              handleStop={() => setAnimationCompleted(true)}
            />
          ))}

        {isTimestamps && (
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
              onClick={handleStopResponse}
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
