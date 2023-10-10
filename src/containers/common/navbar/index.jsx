import React from 'react';
import { Stack } from '@mui/material';

import erisAiLogo from 'assets/eris-ai-white.png';
import englishFlag from 'assets/british-english-flag.jpg';
import arabicFlag from 'assets/uae.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from 'store/slices/languageSlice';
import FlagButton from './FlagButton';

function Navbar() {
  const dispatch = useDispatch();
  const selectedValue = useSelector(state => state.setup?.language);

  const handleUpate = value => {
    dispatch(setLanguage(value));
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      py={1}
      pt={3}
      px={0}
      width={1}
      borderBottom="1px solid #c4c4c4"
    >
      <img src={erisAiLogo} className="mw-100" width={140} alt="ERIS-AI-logo" />

      <Stack direction="row" spacing={2}>
        <FlagButton
          imgSrc={englishFlag}
          value="eng"
          selectedLanguage={selectedValue}
          handleClick={handleUpate}
        />

        <FlagButton
          imgSrc={arabicFlag}
          value="arabic"
          selectedLanguage={selectedValue}
          handleClick={handleUpate}
        />
      </Stack>
    </Stack>
  );
}

export default Navbar;
