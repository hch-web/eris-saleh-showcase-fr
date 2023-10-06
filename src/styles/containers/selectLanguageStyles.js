export const flagStyles = (currentValue, value) => ({
  width: '150px',
  height: '150px',
  boxShadow: currentValue === value ? '2px 2px 10px 2px #0EE7F6' : 'none',

  '& img': {
    objectPosition: value === 'arabic' ? 'center' : 'left',
  },

  '@media screen and (max-width: 768px)': {
    width: '130px',
    height: '130px',
  },
});

export const test = '';
