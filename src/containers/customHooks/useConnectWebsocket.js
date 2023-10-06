import { useEffect, useRef } from 'react';

function useConnectWebsocket(url) {
  const ws = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  return ws;
}

export default useConnectWebsocket;
