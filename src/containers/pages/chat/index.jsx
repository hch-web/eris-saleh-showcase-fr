import React, { useMemo, useRef, useState } from 'react';
import { Box, Container, IconButton, Stack } from '@mui/material';
import { Mic, Send, Stop } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';

// COMPONENTS & UTILITIES
import bgImage from 'assets/query-bg.jpg';
import {
  chatInputWrapperStyles,
  chatMessagesContainerStyles,
  waveformContainerStyles,
} from 'styles/containers/chatPageStyles';
import { getSocketURL } from 'utilities/constants';
import useConnectWebsocket from 'containers/customHooks/useConnectWebsocket';
import useHandleChatMessage from './customHooks/useHandleChat';
import InputField from './components/InputField';
import { queryFormInitValues } from './utilities/formUtils';
import MessageItem from './components/MessageItem';
import LoadingMessage from './components/LoadingMessage';
import { getFormatedMsgDate, largeIconProps, formIconsProps } from './utilities/helpers';
import useWavesurferRecorder from './customHooks/useWavesurferRecord';
import CircularWaveform from './components/CircularWaveform';
import { ChatBotContext } from './context/ChatBotContext';

function ChatPage() {
  const recordContRef = useRef(null);
  const messageRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSpeaking, setSpeaking] = useState(false);
  const [recentQuery, setRecentQuery] = useState(null);
  const selectedLanguage = useSelector(state => state?.setup.language);

  // SOCKET CUSTOM HOOKS
  const socket = useConnectWebsocket(getSocketURL(selectedLanguage));
  useHandleChatMessage(socket, chatMessages, setChatMessages, setLoading, setSpeaking);
  const { handleStartRecording, handleStopRecording, isRecording } =
    useWavesurferRecorder(socket, recordContRef, setChatMessages, setLoading);

  const chatContextValue = useMemo(() => ({ isSpeaking, setSpeaking }), [isSpeaking]);

  const handleRegenerate = () => {
    setLoading(true);
    socket.current.send(JSON.stringify({ query: recentQuery, type: 'text' }));
    messageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        background: `url(${bgImage}) center/cover no-repeat`,
      }}
    >
      <Container
        maxWidth="xl"
        className="d-flex flex-column align-items-center justify-content-end py-3"
        sx={{ minHeight: '100vh' }}
        fixed
      >
        {/* MAIN MIC ICON  */}
        {chatMessages?.length === 0 && (
          <Box className="d-flex align-items-center justify-content-center flex-grow-1">
            {isRecording ? (
              <IconButton {...largeIconProps} onClick={handleStopRecording}>
                <Stop sx={{ fontSize: '150px' }} />
              </IconButton>
            ) : (
              <IconButton {...largeIconProps} onClick={handleStartRecording}>
                <Mic sx={{ fontSize: '150px' }} />
              </IconButton>
            )}
          </Box>
        )}

        {/* CHAT MESSAGES CONTAINER */}
        {chatMessages?.length > 0 && (
          <ChatBotContext.Provider value={chatContextValue}>
            <Box className="d-flex align-items-start flex-column flex-md-row w-100 py-2 flex-grow-1">
              <Box
                className="order-1 order-md-0"
                id="chatbot-cont-wrapper"
                sx={chatMessagesContainerStyles}
              >
                <Box className="d-flex flex-column align-items-start gap-3">
                  {chatMessages?.map((item, idx, arr) => (
                    <MessageItem
                      key={idx}
                      message={item?.query || item?.answer}
                      isQuery={item?.isQuery}
                      timestamp={item?.timestamp}
                      type={item?.type}
                      isLast={idx === arr.length - 1}
                      onRegenerate={handleRegenerate}
                    />
                  ))}

                  {isLoading && <LoadingMessage />}

                  <Box
                    id="_end-block-message"
                    ref={messageRef}
                    sx={{ height: '2px', width: '100%' }}
                  />
                </Box>
              </Box>

              <Box className="order-0 order-md-1" sx={waveformContainerStyles}>
                <CircularWaveform
                  message={chatMessages?.at(-1)?.audio ? chatMessages?.at(-1) : null}
                />
              </Box>
            </Box>
          </ChatBotContext.Provider>
        )}

        {/* CHAT FORM */}
        <Formik
          initialValues={queryFormInitValues}
          onSubmit={(values, { resetForm }) => {
            if (!values?.message) return;

            const payload = {
              query: values?.message,
              type: 'text',
              timestamp: getFormatedMsgDate(),
              isQuery: true,
            };
            setLoading(true);
            socket.current.send(JSON.stringify(payload));
            setChatMessages(prevState => [...prevState, payload]);
            setRecentQuery(values?.message);
            resetForm();
          }}
        >
          {() => (
            <Form className="w-100">
              <Stack
                direction="row"
                alignItems="center"
                sx={chatInputWrapperStyles}
                gap={2}
              >
                <Box
                  className={isRecording ? 'd-block' : 'd-none'}
                  sx={{
                    width: '100%',
                    height: '56px',
                    border: '1px solid #fff',
                    borderRadius: '4px',
                  }}
                  ref={recordContRef}
                />

                {!isRecording && <InputField name="message" />}

                {isRecording ? (
                  <IconButton {...formIconsProps} onClick={handleStopRecording}>
                    <Stop />
                  </IconButton>
                ) : (
                  <IconButton {...formIconsProps} onClick={handleStartRecording}>
                    <Mic />
                  </IconButton>
                )}

                <IconButton {...formIconsProps} type="submit">
                  <Send />
                </IconButton>
              </Stack>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
}

export default ChatPage;
