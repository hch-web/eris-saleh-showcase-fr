import { useCallback, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import { getFormatedMsgDate } from '../utilities/helpers';

function useWavesurferRecorder(
  socketRef,
  containerRef,
  setChatMessages,
  setLoading,
  setRecentQuery
) {
  const [wavesurferRecord, setWavesurferRecord] = useState(null);
  const [isRecording, setRecording] = useState(false);

  useEffect(() => {
    const ws = WaveSurfer.create({
      height: 56,
      waveColor: '#ddd',
      progressColor: '#999',
      container: containerRef.current,
    });

    if ('mediaDevices' in navigator) {
      const record = ws.registerPlugin(RecordPlugin.create());

      record.on('record-start', () => {
        setRecording(true);
      });

      record.on('record-end', blob => {
        setRecording(false);
        setLoading(true);
        socketRef.current.send(blob);

        setRecentQuery({ query: blob, type: 'audio' });

        setChatMessages(prevState => [
          ...prevState,
          {
            query: URL.createObjectURL(blob),
            type: 'audio',
            isQuery: true,
            timestamp: getFormatedMsgDate(),
          },
        ]);
      });

      setWavesurferRecord(record);

      return () => {
        ws?.destroy();
        record.destroy();
      };
    }

    return () => {};
  }, [containerRef, socketRef]);

  const handleStartRecording = useCallback(async () => {
    await wavesurferRecord?.startRecording();
  }, [wavesurferRecord]);

  const handleStopRecording = useCallback(async () => {
    if (wavesurferRecord?.isRecording()) {
      await wavesurferRecord?.stopRecording();
    }
  }, [wavesurferRecord]);

  return { wavesurferRecord, handleStartRecording, handleStopRecording, isRecording };
}

export default useWavesurferRecorder;
