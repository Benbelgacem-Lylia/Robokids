import React from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-international-phone/style.css';
import { PhoneInput } from 'react-international-phone';
import { useTranslation } from 'react-i18next';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import Swal from 'sweetalert2';

// Create RTL cache for Arabic
const OrangeTextField = styled(TextField)({
  marginBottom: '20px',
  '& label.Mui-focused': {
    color: 'orange',
  },
});

const FullWidthPhoneInput = styled(PhoneInput)({
  width: '100%',
  marginBottom: '20px',
  '& .react-international-phone-input': {
    width: '100%',
  },
});


const AddTeacher = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const cacheLtr = createCache({
    key: 'muiltr',
    stylisPlugins: [prefixer],
  });

  const theme = createTheme({
    direction: isRtl ? 'rtl' : 'ltr',
  });

  document.body.dir = isRtl ? 'rtl' : 'ltr';

  const validationSchema = Yup.object({
    name: Yup.string().required(t('nameRequired')),
    qualification: Yup.string().required(t('qualificationRequired')),
    subject: Yup.string().required(t('subjectRequired')),
    email: Yup.string()
      .email(t('emailInvalid'))
      .required(t('emailRequired')),
    phone: Yup.string().required(t('phoneRequired')),
    linkedin: Yup.string().url(t('linkedinInvalid')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      qualification: '',
      subject: '',
      email: '',
      phone: '',
      linkedin: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:9000/teachers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: t('Teacher added successfully!'),
            confirmButtonColor: 'orange',
            background: '#fff9f2',
          });
          formik.resetForm();
        } else {
          Swal.fire({
            icon: 'error',
            title: t('Failed to add teacher.'),
            confirmButtonColor: 'orange',
            background: '#fff9f2',
          });
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: t('An error occurred while adding the teacher.'),
          confirmButtonColor: 'orange',
          background: '#fff9f2',
        });
      }
    },
  });

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', color: 'orange', marginBottom: '20px' }}>
              {t('addTeacherTitle')}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <OrangeTextField
                fullWidth
                label={t('name')}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                required
              />
              <OrangeTextField
                fullWidth
                label={t('qualification')}
                name="qualification"
                value={formik.values.qualification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.qualification && Boolean(formik.errors.qualification)}
                helperText={formik.touched.qualification && formik.errors.qualification}
                required
              />
              <OrangeTextField
                fullWidth
                label={t('subject')}
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
                required
              />
              <OrangeTextField
                fullWidth
                label={t('email')}
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                required
              />
              <FullWidthPhoneInput
                defaultCountry="dz"
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue('phone', phone)}
                onBlur={formik.handleBlur}
                preferredCountries={['dz', 'us', 'gb']}
                containerClassName="phone-input"
              />
              <OrangeTextField
                fullWidth
                label={t('linkedinProfile')}
                name="linkedin"
                value={formik.values.linkedin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
                helperText={formik.touched.linkedin && formik.errors.linkedin}
              />
              <Button type="submit" variant="contained" style={{ backgroundColor: 'orange', color: '#fff' }}>
                {t('addTeacherButton')}
              </Button>
            </form>
          </Paper>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AddTeacher;
