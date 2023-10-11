import moment from 'moment';

export const getFormatedMsgDate = () => moment().format('hh:mm A');

export const largeIconProps = {
  color: 'whiteColor',
  size: 'large',
  sx: { background: 'rgba(255, 255, 255, 0.04)' },
};

export const formIconsProps = {
  size: 'large',
  color: 'whiteColor',
};

export const drawCircularAudioSpectrum = ({
  analyser,
  ctx,
  dataArray,
  canvas,
  pointCount,
  bufferLength,
  centerX,
  centerY,
  maxRadius,
  minLineWidth,
  maxLineWidth,
}) => {
  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'white';

  const angleStep = (2 * Math.PI) / pointCount;

  for (let i = 0; i < pointCount; i++) {
    const angle = i * angleStep;
    const value = dataArray[Math.floor((i / pointCount) * bufferLength)] / 255.0; // Normalize the value to [0, 1]
    const radius = maxRadius;
    const lineWidth = minLineWidth + (maxLineWidth - minLineWidth) * value;

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(x, y, lineWidth / 2, 0, 2 * Math.PI); // Use arc to create points
    ctx.stroke();
  }

  requestAnimationFrame(() => drawCircularAudioSpectrum({
    analyser,
    ctx,
    dataArray,
    canvas,
    pointCount,
    bufferLength,
    centerX,
    centerY,
    maxRadius,
    minLineWidth,
    maxLineWidth,
  }));
};

export const convertBase64ToBlob = base64 => {
  const byteString = atob(base64);
  const mimeString = 'audio/mpeg';
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i += 1) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: mimeString });

  return URL.createObjectURL(blob);
};

export const messagePlayPauseBtnProps = {
  size: 'small',
  color: 'whiteColor',
  sx: {
    background: 'rgba(255,255,255,.2)',
    ':hover': { background: 'rgba(255,255,255,.2)' },
  },
};
