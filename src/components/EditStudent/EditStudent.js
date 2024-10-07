import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Paper, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useTranslation } from 'react-i18next';
import { CacheProvider } from '@emotion/react'; // Import CacheProvider
import createCache from '@emotion/cache'; // Import createCache for RTL
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider
import rtlPlugin from 'stylis-plugin-rtl'; // Import RTL plugin for emotion
import { prefixer } from 'stylis';
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // SweetAlert2 CSS

// Styled Button with orange color theme
const StyledButton = styled(Button)({
  backgroundColor: '#FF8C00', // Dark orange
  color: 'white',
  marginTop: '15px',
  '&:hover': {
    backgroundColor: '#FF7F50', // Slightly lighter shade on hover
  },
});
const FullWidthPhoneInput = styled(PhoneInput)({
  width: '100%',
  marginBottom: '20px',
  '& .react-international-phone-input': {
    width: '100%',
  },
});

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar'; // Check if the current language is Arabic

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

  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    studyProgram: '',
  });

  useEffect(() => {
    // Fetch the student data to initialize the form
    axios
      .get(`http://localhost:9000/students/${id}`)
      .then((response) => {
        setInitialValues(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, [id]);

  // Form validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('validation.firstNameRequired')),
    lastName: Yup.string().required(t('validation.lastNameRequired')),
    dob: Yup.date().required(t('validation.dobRequired')),
    gender: Yup.string().required(t('validation.genderRequired')),
    email: Yup.string()
      .email(t('validation.emailInvalid'))
      .required(t('validation.emailRequired')),
    phone: Yup.string().required(t('validation.phoneRequired')),
    studyProgram: Yup.string().required(t('validation.studyProgramRequired')),
  });

  // Formik setup
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      axios
        .put(`http://localhost:9000/students/${id}`, values)
        .then((response) => {
          // SweetAlert for success
          Swal.fire({
            title: t('messages.updateSuccess'),
            icon: 'success',
            confirmButtonColor: '#FF8C00', // Orange button
          });
          navigate('/controlpannel/allstudents'); // Redirect to students list page
        })
        .catch((error) => {
          // SweetAlert for error
          Swal.fire({
            title: t('messages.updateFailed'),
            text: error.message,
            icon: 'error',
            confirmButtonColor: '#FF8C00', // Orange button
          });
        });
    },
  });

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom style={{ color: '#FF8C00' }}>
              {t('editStudent.title')}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label={t('editStudent.firstName')}
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
                label={t('editStudent.lastName')}
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
                label={t('editStudent.dob')}
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
                select
                label={t('editStudent.gender')}
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                <MenuItem value="male">{t('editStudent.male')}</MenuItem>
                <MenuItem value="female">{t('editStudent.female')}</MenuItem>
              </TextField>
              <TextField
                fullWidth
                margin="normal"
                label={t('editStudent.email')}
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
                onChange={(value) => formik.setFieldValue('phone', value)}
                onBlur={() => formik.setFieldTouched('phone', true)}
                inputProps={{
                  name: 'phone',
                  error: formik.touched.phone && Boolean(formik.errors.phone),
                }}
              />
              {formik.touched.phone && formik.errors.phone && (
                <Typography color="error" variant="body2">
                  {formik.errors.phone}
                </Typography>
              )}
              <TextField
                fullWidth
                margin="normal"
                select
                label={t('editStudent.studyProgram')}
                name="studyProgram"
                value={formik.values.studyProgram}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.studyProgram && Boolean(formik.errors.studyProgram)}
                helperText={formik.touched.studyProgram && formik.errors.studyProgram}
              >
                <MenuItem value="preparatoryCycle">{t('editStudent.preparatoryCycle')}</MenuItem>
                <MenuItem value="mechatronics">{t('editStudent.mechatronics')}</MenuItem>
                <MenuItem value="iot">{t('editStudent.iot')}</MenuItem>
                <MenuItem value="softwareEngineering">{t('editStudent.softwareEngineering')}</MenuItem>
              </TextField>
              <StyledButton type="submit" fullWidth>
                {t('editStudent.updateButton')}
              </StyledButton>
            </form>
          </Paper>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default EditStudent;
