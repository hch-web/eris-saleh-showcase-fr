import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Box, Container, IconButton, Stack } from '@mui/material';
import { Mic, Send, Stop } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

// COMPONENTS & UTILITIES
import {
  chatInputWrapperStyles,
  chatMessagesContainerStyles,
  waveformContainerStyles,
} from 'styles/containers/chatPageStyles';
import useConnectWebsocket from 'containers/customHooks/useConnectWebsocket';
import Navbar from 'containers/common/navbar/index';
import useHandleChatMessage from './customHooks/useHandleChat';
import InputField from './components/InputField';
import { queryFormInitValues } from './utilities/formUtils';
import MessageItem from './components/MessageItem';
import LoadingMessage from './components/LoadingMessage';
import { getFormatedMsgDate, largeIconProps, formIconsProps } from './utilities/helpers';
import useWavesurferRecorder from './customHooks/useWavesurferRecord';
import CircularWaveform from './components/CircularWaveform';
import { ChatBotContext } from './context/ChatBotContext';
import { particlesOptions } from './utilities/data';

function ChatPage() {
  const recordContRef = useRef(null);
  const messageRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSpeaking, setSpeaking] = useState(false);
  const [isStopped, setStopped] = useState(false);
  const [recentQuery, setRecentQuery] = useState(null);

  // SOCKET CUSTOM HOOKS
  const socket = useConnectWebsocket();
  useHandleChatMessage(socket, chatMessages, setChatMessages, setLoading);
  const { handleStartRecording, handleStopRecording, isRecording } =
    useWavesurferRecorder(
      socket,
      recordContRef,
      setChatMessages,
      setLoading,
      setRecentQuery
    );

  const chatContextValue = useMemo(
    () => ({
      isSpeaking,
      setSpeaking,
      isStopped,
      setStopped,
    }),
    [isSpeaking, isStopped]
  );

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const handleRegenerate = () => {
    setLoading(true);

    if (recentQuery?.type === 'audio') {
      socket.current.send(recentQuery.query);
    } else {
      socket.current.send(JSON.stringify(recentQuery));
    }

    messageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Particles init={particlesInit} options={particlesOptions} />

      <Box position="relative" zIndex={4}>
        <Container
          maxWidth="xl"
          className="d-flex flex-column align-items-center justify-content-end py-3"
          sx={{ height: '100vh', minHeight: '500px' }}
          fixed
        >
          <Navbar />

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
              <Box className="d-flex align-items-start flex-column flex-md-row w-100 py-2 flex-grow-1 gap-3 gap-md-0">
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
              setRecentQuery({ query: values?.message, type: 'text' });
              resetForm();
            }}
          >
            {() => (
              <Form className="w-100">
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={chatInputWrapperStyles}
                  gap={{ xs: 1, md: 2 }}
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
                    <IconButton
                      {...formIconsProps}
                      type="button"
                      onClick={handleStopRecording}
                    >
                      <Stop />
                    </IconButton>
                  ) : (
                    <IconButton
                      {...formIconsProps}
                      type="button"
                      onClick={handleStartRecording}
                    >
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
    </>
  );
}

export default memo(ChatPage);
