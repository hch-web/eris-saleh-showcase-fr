import { useRef, useState } from 'react';
import { getFormatedMsgDate } from '../utilities/helpers';

function useHandleVoiceRecording(socket, setChatMessages, setLoading) {
  const mediaRecorder = useRef(null);
  const [isVoiceRecording, setVoiceRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    mediaRecorder.current.ondataavailable = async event => {
      if (event.data.size > 0 && socket.current) {
        setAudioBlob(event.data);

        socket.current.send(event.data);
        setChatMessages(prevState => [
          ...prevState,
          {
            query: URL.createObjectURL(event.data),
            type: 'audio',
            isQuery: true,
            timestamp: getFormatedMsgDate(),
          },
        ]);
        setAudioBlob(null);
        setLoading(true);
      }
    };

    mediaRecorder.current.start();
    setVoiceRecording(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    setVoiceRecording(false);
  };

  return { isVoiceRecording, audioBlob, handleStartRecording, handleStopRecording };
}

export default useHandleVoiceRecording;
