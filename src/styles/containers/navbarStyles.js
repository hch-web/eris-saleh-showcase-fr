export const flagBtnStyles = (currentValue, value) => ({
  width: '30px',
  height: '30px',
  boxShadow: currentValue === value ? '2px 2px 7px #0EE7F6' : 'none',
  cursor: 'pointer',

  '& img': {
    objectPosition: value === 'arabic' ? 'center' : 'left',
  },

  '@media screen and (max-width: 768px)': {
    width: '28px',
    height: '28px',
  },
});

export const test = '';
