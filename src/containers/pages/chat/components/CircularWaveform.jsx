import React, { memo, useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';

import staticCircle from 'assets/avatar-image.png';
import spectrumAnimation from 'assets/circle-avatar-animation.gif';
import { convertBase64ToBlob } from '../utilities/helpers';
import { useChatBotContext } from '../context/ChatBotContext';

function CircularWaveform({ message }) {
  const audioRef = useRef(null);
  const [isAudioCompleted, setAudioCompleted] = useState(false);
  const { isSpeaking, setSpeaking, isStopped } = useChatBotContext();

  useEffect(() => {
    if (message?.audio) {
      const blob = convertBase64ToBlob(message.audio);
      const audio = new Audio(blob);
      audioRef.current = audio;

      audio.addEventListener('play', () => {
        setAudioCompleted(false);
      });

      audio.addEventListener('ended', () => {
        setAudioCompleted(true);
        setSpeaking(false);
      });

      audioRef.current.play().then(() => {});
    }
  }, [message]);

  useEffect(() => {
    if (isSpeaking && isStopped) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSpeaking(false);
    }
  }, [isSpeaking, audioRef.current, isStopped, isAudioCompleted]);

  return (
    <>
      <img
        src={isSpeaking ? spectrumAnimation : staticCircle}
        alt="Circular Spectrum"
        className="mx-100 mh-100 user-select-none"
        height={400}
        width={400}
      />

      {/* <canvas ref={canvasRef} className="mw-100 mh-100" width={400} height={400} /> */}
    </>
  );
}

CircularWaveform.propTypes = {
  message: propTypes.object,
};

CircularWaveform.defaultProps = {
  message: null,
};

export default memo(CircularWaveform);
