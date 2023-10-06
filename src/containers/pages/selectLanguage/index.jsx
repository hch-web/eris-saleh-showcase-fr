import React, { useCallback } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// COMPONENTS & UTILITIES
import logo from 'assets/saleh-logo.png';
import englishFlag from 'assets/british-english-flag.jpg';
import arabicFlag from 'assets/uae.jpg';
import bgImage from 'assets/bg-1.3.jpg';
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
        background: `linear-gradient(90deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${bgImage}) center/cover no-repeat`,
      }}
    >
      <Box
        className="d-flex align-items-center justify-content-center"
        sx={{ position: 'absolute', top: 15, left: 0, right: 0 }}
      >
        <img width={400} src={logo} alt="Eris-Chatbot-logo" />
      </Box>

      <Container
        fixed
        className="d-flex flex-column align-items-center justify-content-center py-3 py-md-2"
        sx={{ minHeight: '600px', height: '100vh' }}
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

      <Box
        className="text-white"
        sx={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center' }}
      >
        <Typography textTransform="uppercase" variant="caption">
          Powered By Eris AI
        </Typography>
      </Box>
    </Box>
  );
}

export default SelectLanguage;
