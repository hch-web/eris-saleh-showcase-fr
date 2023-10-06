import { createContext, useContext } from 'react';

export const ChatBotContext = createContext({
  isSpeaking: false,
  setSpeaking: () => {},
});

export const useChatBotContext = () => {
  const context = useContext(ChatBotContext);

  return context;
};
