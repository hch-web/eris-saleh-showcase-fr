import * as yup from 'yup';

export const mainFormInitValues = {
  language: 'eng',
  country: 'uae',
};

export const mainFormValSchema = yup.object({
  language: yup.string().required('Language is required'),
  country: yup.string().required('Country is required'),
});
