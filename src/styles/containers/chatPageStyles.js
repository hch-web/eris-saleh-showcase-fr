export const chatPageContainerStyles = bgImage => ({
  background: `url(${bgImage}) center/cover no-repeat`,
});

export const chatInputFieldStyles = {
  '*': { color: 'white !important' },
  '& fieldset': { borderColor: 'white' },

  ':hover': {
    '& fieldset': { borderColor: 'white !important' },
  },
};

export const chatInputWrapperStyles = {
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(3px)',
  padding: '8px 16px',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
  borderRadius: '10px',
  mb: '16px',
};

export const chatMessagesContainerStyles = {
  overflowY: 'auto',
  width: '50%',
  maxHeight: '800px',
  height: 'calc(100vh - 200px)',
  minHeight: 'calc(100vh - 200px)',
  padding: '12px 10px 12px 0',

  '@media screen and (max-width: 768px)': {
    width: '100%',
    padding: '8px 0 8px 0',
    height: 'calc(100vh - 400px)',
    minHeight: '100px',
    maxHeight: '550px',
  },

  '&::-webkit-scrollbar': {
    width: '5px',
  },

  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
};

export const waveformContainerStyles = {
  width: '50%',
  maxWidth: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',

  '@media screen and (max-width: 768px)': {
    width: '100%',
    maxWidth: '100%',
  },
};

export const messageStyles = (isSentByMe, isAudio) => ({
  background: isSentByMe ? 'rgba(0, 0, 0, 0.1)' : 'rgba(219,219,219, 0.1)',
  backdropFilter: 'blur(3px)',
  borderRadius: '0px 10px 10px 10px',
  padding: '8px 12px',
  maxWidth: '100%',

  ...(isAudio && {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    padding: '8px 0',
    backdropFilter: 'none',

    '& audio': {
      maxWidth: '100%',
    },
  }),
});

export const loadingMessageStyles = {
  background: theme => theme.palette.primary.main,
  padding: '3px 8px',
  borderRadius: '7px 7px 7px 0',
};

export const messageResponseBtnStyles = {
  fontSize: 12,
  background: 'rgba(255, 255, 255, .1)',
  backdropFilter: 'blur(2px)',

  '&.Mui-disabled': {
    color: 'rgba(255,255,255,0.5)',
  },
};

export const getImageSpectrumStyles = image => ({
  background: `url(${image}) center/contain no-repeat`,
  width: 400,
  height: 400,
  maxWidth: '100%',
  maxHeight: '100%',

  '@media screen and (max-width: 768px)': {
    width: 200,
    height: 200,
  },

  '@media screen and (min-height: 1700px) and (min-width: 1500px)': {
    width: 550,
    height: 550,
  },
});
