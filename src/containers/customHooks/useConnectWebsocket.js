import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getSocketURL } from 'utilities/constants';

function useConnectWebsocket() {
  const ws = useRef(null);
  const selectedLanguage = useSelector(state => state?.setup.language);
  const url = useMemo(() => getSocketURL(selectedLanguage), [selectedLanguage]);

  useEffect(() => {
    const socket = new WebSocket(url);
    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [url]);

  return ws;
}

export default useConnectWebsocket;
