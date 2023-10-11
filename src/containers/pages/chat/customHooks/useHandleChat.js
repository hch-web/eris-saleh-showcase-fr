import { useEffect, useRef } from 'react';
import { convertBase64ToBlob, getFormatedMsgDate } from '../utilities/helpers';

function useHandleChatMessage(
  socketRef,
  chatMessages,
  setMessages,
  setLoading,
  isSpeaking,
  setSpeaking,
  isStopped,
  setStopped
) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (socketRef.current) {
      const currentSocket = socketRef.current;

      currentSocket.onmessage = e => {
        const data = JSON.parse(e.data);

        if (data?.audio) {
          const blob = convertBase64ToBlob(data.audio);
          const audio = new Audio();
          audio.src = blob;
          audioRef.current = audio;

          audio.addEventListener('play', () => {
            if (isStopped) {
              setStopped(false);
            }

            setSpeaking(true);
          });

          audio.addEventListener('ended', () => {
            setSpeaking(false);
          });

          audio.play().catch(err => {
            // eslint-disable-next-line no-console
            console.log('Error playing audio: ', err);
          });
        }

        setMessages(prevState => [
          ...prevState,
          {
            answer: data?.answer,
            timestamp: getFormatedMsgDate(),
            isQuery: false,
            type: 'text',
            audio: data?.audio,
          },
        ]);
        setLoading(false);
      };
    }
  }, [socketRef.current]);

  useEffect(() => {
    if (chatMessages.length > 0) {
      const endMessageItem = document.getElementById('_end-block-message');

      if (endMessageItem) {
        endMessageItem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isSpeaking && isStopped) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSpeaking(false);
    }
  }, [isSpeaking, audioRef.current, isStopped]);

  return null;
}

export default useHandleChatMessage;
