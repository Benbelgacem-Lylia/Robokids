import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'; // Import sweetalert2
import {
  TextField, Button, Container, Typography, Paper, MenuItem, CircularProgress,
  Radio, RadioGroup, FormControl, FormControlLabel, FormHelperText
} from '@mui/material';
import { styled } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useTranslation } from 'react-i18next';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// Styled Button with orange color theme
const StyledButton = styled(Button)({
  backgroundColor: '#FF8C00',
  color: 'white',
  marginTop: '15px',
  '&:hover': {
    backgroundColor: '#FF7F50',
  },
});

const FullWidthPhoneInput = styled(PhoneInput)({
  width: '100%',
  marginBottom: '20px',
  '& .react-international-phone-input': {
    width: '100%',
  },
});

const AddStudent = () => {
  // const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar'; // Check if the current language is Arabic
  const [loading, setLoading] = useState(false);

  // Define RTL and LTR caches
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin], // Enable RTL support
  });

  const cacheLtr = createCache({
    key: 'muiltr',
    stylisPlugins: [prefixer], // LTR by default
  });

  // Define theme with RTL support if Arabic
  const theme = createTheme({
    direction: isRtl ? 'rtl' : 'ltr', // Switch direction based on language
  });

  // Apply the direction in the DOM
  document.body.dir = isRtl ? 'rtl' : 'ltr';

  // Initial form values
  const initialValues = {
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    studyProgram: '',
  };

  // Validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('validation.firstNameRequired')),
    lastName: Yup.string().required(t('validation.lastNameRequired')),
    dob: Yup.date().required(t('validation.dobRequired')),
    gender: Yup.string().required(t('validation.genderRequired')),
    email: Yup.string().email(t('validation.emailInvalid')).required(t('validation.emailRequired')),
    phone: Yup.string().required(t('validation.phoneRequired')),
    studyProgram: Yup.string().required(t('validation.studyProgramRequired')),
  });

  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true); // Set loading to true while submitting
      axios.post('http://localhost:9000/students', values)
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: t('Student Added Successfully'),
            showConfirmButton: false,
            timer: 1500,
          });
          // navigate('/controlpannel/allstudents'); // Redirect to students list page
        })
        .catch((error) => {
          console.error('Error adding student:', error);
          Swal.fire({
            icon: 'error',
            title: t('Failed to add student'),
            text: error.message,
          });
        })
        .finally(() => {
          setLoading(false); // Set loading to false after submission
        });
    },
  });

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom style={{ color: '#FF8C00' }}>
              {t('AddStudent')}
            </Typography>
            {loading ? <CircularProgress /> : (
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label={t('firstName')}
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label={t('lastName')}
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label={t('dateOfBirth')}
                  name="dob"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dob && Boolean(formik.errors.dob)}
                  helperText={formik.touched.dob && formik.errors.dob}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label={t('email')}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <FullWidthPhoneInput
                  containerClassName="phone-input"
                  defaultCountry="us"
                  value={formik.values.phone}
                  onChange={(value) => {
                    formik.setFieldValue('phone', value);
                    formik.setFieldTouched('phone', true);
                  }}
                  onBlur={() => formik.setFieldTouched('phone', true)}
                  inputProps={{
                    name: 'phone',
                    error: formik.touched.phone && Boolean(formik.errors.phone),
                  }}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <Typography color="error" variant="body2">{formik.errors.phone}</Typography>
                )}

                <TextField
                  fullWidth
                  margin="normal"
                  select
                  label={t('selectProgram')}
                  name="studyProgram"
                  value={formik.values.studyProgram}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.studyProgram && Boolean(formik.errors.studyProgram)}
                  helperText={formik.touched.studyProgram && formik.errors.studyProgram}
                >
                  <MenuItem value="preparatoryCycle">{t('PreparatoryCycle')}</MenuItem>
                  <MenuItem value="mechatronics">{t('mechatronics')}</MenuItem>
                  <MenuItem value="iot">{t('InternetOfThings')}</MenuItem>
                  <MenuItem value="softwareEngineering">{t('softwareEngineering')}</MenuItem>
                </TextField>
                <FormControl component="fieldset" margin="normal" error={formik.touched.gender && Boolean(formik.errors.gender)}>
                  <Typography>{t('gender')}</Typography>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <FormControlLabel value="male" control={<Radio />} label={t('male')} />
                    <FormControlLabel value="female" control={<Radio />} label={t('female')} />
                  </RadioGroup>
                  {formik.touched.gender && formik.errors.gender && (
                    <FormHelperText>{formik.errors.gender}</FormHelperText>
                  )}
                </FormControl>
                <StyledButton type="submit" fullWidth>
                  {t('AddStudentButton')}
                </StyledButton>

              </form>
            )}
          </Paper>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AddStudent;
