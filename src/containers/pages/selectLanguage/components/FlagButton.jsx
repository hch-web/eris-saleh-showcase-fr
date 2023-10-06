import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { flagStyles } from 'styles/containers/selectLanguageStyles';

function FlagButton({ handleClick, selectedLanguage, imageSrc, label, value }) {
  return (
    <Box textAlign="center">
      <Avatar
        onClick={handleClick}
        sx={flagStyles(selectedLanguage, value)}
        src={imageSrc}
      />

      <Typography mt={2} variant="h6" color="white">
        {label}
      </Typography>
    </Box>
  );
}

FlagButton.propTypes = {
  handleClick: propTypes.func.isRequired,
  selectedLanguage: propTypes.string.isRequired,
  imageSrc: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
};

export default FlagButton;
