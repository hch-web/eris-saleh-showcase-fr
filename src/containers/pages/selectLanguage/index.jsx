import React, { useCallback } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// COMPONENTS & UTILITIES
import englishFlag from 'assets/british-english-flag.jpg';
import arabicFlag from 'assets/arabic-flag.jpg';
import bgImage from 'assets/bg-1.jpg';
import { setLanguage } from 'store/slices/languageSlice';
import { mainFormInitValues, mainFormValSchema } from './utilities/formUtils';
import FlagButton from './components/FlagButton';

function SelectLanguage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = useCallback((value, setFieldValue) => {
    setFieldValue('language', value);
  }, []);

  return (
    <Box
      sx={{
        background: `linear-gradient(90deg, rgba(0,0,0,.8), rgba(0,0,0,.8)), url(${bgImage}) center/cover no-repeat`,
      }}
    >
      <Container
        fixed
        className="d-flex flex-column align-items-center justify-content-center py-3 py-md-2"
        sx={{ minHeight: '100vh' }}
      >
        <Formik
          initialValues={mainFormInitValues}
          validationSchema={mainFormValSchema}
          onSubmit={value => {
            dispatch(setLanguage(value.language));
            navigate('/chat');
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="d-flex flex-column gap-4 gap-md-5 w-100">
              <Typography
                variant="pageTitle"
                textTransform="uppercase"
                textAlign="center"
                color="white"
              >
                Select Language
              </Typography>

              <Box className="d-flex align-items-start justify-content-evenly flex-wrap flex-md-nowrap gap-5 w-100">
                <FlagButton
                  imageSrc={englishFlag}
                  selectedLanguage={values.language}
                  handleClick={() => handleClick('eng', setFieldValue)}
                  label="English"
                  value="eng"
                />

                <FlagButton
                  imageSrc={arabicFlag}
                  selectedLanguage={values.language}
                  handleClick={() => handleClick('arabic', setFieldValue)}
                  label="Arabic"
                  value="arabic"
                />
              </Box>

              <Stack
                width={1}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Button size="large" variant="contained" color="secondary" type="submit">
                  Next
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
}

export default SelectLanguage;
