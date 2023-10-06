import React, { memo } from 'react';
import { Box, TextField } from '@mui/material';
import propTypes from 'prop-types';
import { useField } from 'formik';

import { chatInputFieldStyles } from 'styles/containers/chatPageStyles';

function InputField({ name }) {
  const [field, meta] = useField(name || '');
  const { onChange, value } = field;
  const { error, touched } = meta;

  return (
    <Box className="w-100">
      <TextField
        label="Type your query here..."
        name={name}
        variant="outlined"
        color="whiteColor"
        fullWidth
        sx={chatInputFieldStyles}
        value={value}
        onChange={onChange}
        error={touched && !!error}
      />
    </Box>
  );
}

InputField.propTypes = {
  name: propTypes.string.isRequired,
};

export default memo(InputField);
