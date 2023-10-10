import React from 'react';
import { Avatar } from '@mui/material';
import propTypes from 'prop-types';

import { flagBtnStyles } from 'styles/containers/navbarStyles';

function FlagButton({ handleClick, selectedLanguage, value, imgSrc }) {
  return (
    <Avatar
      src={imgSrc}
      onClick={() => handleClick(value)}
      sx={flagBtnStyles(selectedLanguage, value)}
    />
  );
}

FlagButton.propTypes = {
  handleClick: propTypes.func.isRequired,
  selectedLanguage: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  imgSrc: propTypes.string.isRequired,
};

export default FlagButton;
