import React, { memo, useMemo, useRef, useState } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';

import {
  messageResponseBtnStyles,
  messageStyles,
} from 'styles/containers/chatPageStyles';
import TypingEffect from 'shared/TypingEffect';
import { PlayArrow, Stop } from '@mui/icons-material';
import { useChatBotContext } from '../context/ChatBotContext';
import { convertBase64ToBlob, messagePlayPauseBtnProps } from '../utilities/helpers';

function MessageItem({ message, isQuery, timestamp, type, isLast, onRegenerate, audio }) {
  const audioRef = useRef(null);
  const { isSpeaking, setStopped, setSpeaking } = useChatBotContext();
  const [isPlaying, setPlaying] = useState(false);
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

  const handlePlayAudio = () => {
    const blob = convertBase64ToBlob(audio);
    const audioEl = new Audio(blob);
    audioRef.current = audioEl;

    audioEl.addEventListener('play', () => {
      setPlaying(true);
      setSpeaking(true);
    });

    audioEl.addEventListener('ended', () => {
      setPlaying(false);
      setSpeaking(false);
    });

    audioEl.play();
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
      setSpeaking(false);
    }
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

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          mt={1}
        >
          {!isQuery &&
            !isAudio &&
            isAnimationCompleted &&
            (isPlaying ? (
              <IconButton
                title="Stop"
                {...messagePlayPauseBtnProps}
                onClick={handleStopAudio}
              >
                <Stop sx={{ fontSize: 14 }} />
              </IconButton>
            ) : (
              <IconButton
                title="Play"
                {...messagePlayPauseBtnProps}
                onClick={handlePlayAudio}
              >
                <PlayArrow sx={{ fontSize: 14 }} />
              </IconButton>
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
        </Stack>
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
  audio: propTypes.string,
};

MessageItem.defaultProps = {
  audio: null,
};

export default memo(MessageItem);
