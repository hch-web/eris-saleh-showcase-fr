/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import propTypes from 'prop-types';

// import audioFile from 'assets/audioSample-3.mp3';
import staticCircle from 'assets/static-voice-2.png';
import spectrumAnimation from 'assets/audio-spectrum-animation.gif';
import { convertBase64ToBlob, drawCircularAudioSpectrum } from '../utilities/helpers';
import { useChatBotContext } from '../context/ChatBotContext';

function CircularWaveform({ message }) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const { isSpeaking } = useChatBotContext();

  useEffect(() => {
    if (message?.audio) {
      // const canvas = canvasRef.current;
      // const ctx = canvas.getContext('2d');

      const blob = convertBase64ToBlob(message.audio);
      const audio = new Audio(blob);
      audioRef.current = audio;

      // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      // const source = audioContext.createMediaElementSource(audioRef.current);
      // const analyser = audioContext.createAnalyser();
      // analyser.fftSize = 256; // Adjust the buffer size as needed
      // source.connect(analyser);
      // analyser.connect(audioContext.destination);

      // const bufferLength = analyser.frequencyBinCount;
      // const dataArray = new Uint8Array(bufferLength);

      // const centerX = canvas.width / 2;
      // const centerY = canvas.height / 2;
      // const maxRadius = Math.min(centerX, centerY) * 0.6;
      // const minLineWidth = 2; // Minimum line width
      // const maxLineWidth = 15; // Maximum line width
      // const pointCount = 40; // Number of points around the circle

      // drawCircularAudioSpectrum({
      //   analyser,
      //   ctx,
      //   dataArray,
      //   canvas,
      //   pointCount,
      //   bufferLength,
      //   centerX,
      //   centerY,
      //   maxRadius,
      //   minLineWidth,
      //   maxLineWidth,
      // });

      audioRef.current.play().then(() => {});
    }
  }, [message]);

  useEffect(() => {
    if (!isSpeaking && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isSpeaking, audioRef]);

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

export default CircularWaveform;
