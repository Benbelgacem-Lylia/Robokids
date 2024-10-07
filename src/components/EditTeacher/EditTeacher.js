import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
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
import Swal from 'sweetalert2'; // Import SweetAlert

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

const EditTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Initialize translation
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
    name: '',
    qualification: '',
    subject: '',
    email: '',
    phone: '',
    linkedin: '',
  });

  useEffect(() => {
    // Fetch the teacher data to initialize the form
    axios.get(`http://localhost:9000/teachers/${id}`)
      .then((response) => {
        setInitialValues(response.data);
      })
      .catch((error) => {
        console.error('Error fetching teacher data:', error);
      });
  }, [id]);

  // Form validation schema with translations
  const validationSchema = Yup.object({
    name: Yup.string().required(t('nameRequired')),
    qualification: Yup.string().required(t('qualificationRequired')),
    subject: Yup.string().required(t('subjectRequired')),
    email: Yup.string().email(t('emailInvalid')).required(t('emailRequired')),
    phone: Yup.string().required(t('phoneRequired')),
    linkedin: Yup.string().url(t('linkedinInvalid')).required(t('linkedinRequired')),
  });

  // Formik setup
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      axios.put(`http://localhost:9000/teachers/${id}`, values)
        .then((response) => {
          Swal.fire({
            title: t('teacherUpdated'),
            icon: 'success',
            confirmButtonColor: '#FF8C00', // Dark orange color for the button
          }).then(() => {
            navigate('/controlpannel/allteachers'); // Redirect to teachers list page
          });
        })
        .catch((error) => {
          console.error('Error updating teacher data:', error);
          Swal.fire({
            title: t('teacherUpdateFailed'),
            icon: 'error',
            confirmButtonColor: '#FF8C00', // Dark orange color for the button
          });
        });
    },
  });

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom style={{ color: '#FF8C00' }}> {/* Dark Orange */}
              {t('editTeacher')}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label={t('name')}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                margin="normal"
                label={t('qualification')}
                name="qualification"
                value={formik.values.qualification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.qualification && Boolean(formik.errors.qualification)}
                helperText={formik.touched.qualification && formik.errors.qualification}
              />
              <TextField
                fullWidth
                margin="normal"
                label={t('subject')}
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
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
                onChange={(value) => formik.setFieldValue('phone', value)}
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
                label={t('linkedin')}
                name="linkedin"
                value={formik.values.linkedin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
                helperText={formik.touched.linkedin && formik.errors.linkedin}
              />
              <StyledButton type="submit" fullWidth>
                {t('updateTeacher')}
              </StyledButton>
            </form>
          </Paper>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default EditTeacher;
