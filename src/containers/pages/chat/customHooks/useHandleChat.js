import { useEffect } from 'react';
import { getFormatedMsgDate } from '../utilities/helpers';

function useHandleChatMessage(socketRef, chatMessages, setMessages, setLoading) {
  useEffect(() => {
    if (socketRef.current) {
      const currentSocket = socketRef.current;

      currentSocket.onmessage = e => {
        const data = JSON.parse(e.data);

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

  return null;
}

export default useHandleChatMessage;
