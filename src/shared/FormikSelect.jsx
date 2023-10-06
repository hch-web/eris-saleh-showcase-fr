import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import propTypes from 'prop-types';
import { useField } from 'formik';

function FormikSelect({ name, options, label }) {
  const [innerValue, setInnerValue] = useState('');
  const [field, meta] = useField(name || '');
  const { onChange, value } = field;
  const { error, touched } = meta;

  useEffect(() => {
    if (value !== '' && value !== undefined) setInnerValue(value);
  }, []);

  const handleChange = useCallback(event => {
    setInnerValue(event.target.value);

    onChange(event);
  }, []);

  return (
    <Box>
      <FormControl
        variant="standard"
        sx={{ minWidth: 120 }}
        fullWidth
        error={!!(error && touched)}
      >
        {label && <InputLabel id="select-label">{label}</InputLabel>}

        <Select name={name} label={label} value={innerValue} onChange={handleChange}>
          {options?.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        {error && touched && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

FormikSelect.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string,
  options: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.string,
      label: propTypes.string,
    })
  ),
};

FormikSelect.defaultProps = {
  label: '',
  options: [],
};

export default FormikSelect;
