import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { CacheProvider } from '@emotion/react'; 
import createCache from '@emotion/cache'; 
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import rtlPlugin from 'stylis-plugin-rtl'; 
import Swal from 'sweetalert2';

// Create RTL cache for Arabic
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

// Theme customization if needed
const theme = createTheme({
  direction: 'rtl',
});

// Styles for RTL layout
const rtlStyle = {
  direction: 'rtl',
  textAlign: 'right',
};

// Function to apply styles based on the current language
const placeholderStyle = (lang) => ({
  textAlign: lang === 'ar' ? 'right' : 'left',
  direction: lang === 'ar' ? 'rtl' : 'ltr',
});

// Function to apply label alignment based on the current language
const labelStyle = (lang) => ({
  textAlign: lang === 'ar' ? 'right' : 'left',
  paddingRight: lang === 'ar' ? '20px' : '0px',
});

const LogIn = () => {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('invalidEmail'))
        .required(t('email') + ' ' + t('isRequired')),
      password: Yup.string()
        .min(8, t('password') + ' ' + t('mustBeAtLeast8Characters'))
        .required(t('password') + ' ' + t('isRequired')),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get(`http://localhost:9000/users`, {
          params: { email: values.email, password: values.password },
        });

        if (response.data.length > 0) {
          Swal.fire({
            icon: 'success',
            title: t('loginSuccess'),
            showConfirmButton: false,
            timer: 1500,
            buttonsStyling: false,
            customClass: {
              confirmButton: 'custom-orange-button',
            },
          });
          navigate('/controlpannel');
        } else {
          Swal.fire({
            icon: 'error',
            title: t('invalidCredentials'),
            text: t('pleaseTryAgain'),
            buttonsStyling: false,
            customClass: {
              confirmButton: 'custom-orange-button',
            },
          });
          navigate('/login');
        }
      } catch (error) {
        console.error('Error during authentication', error);
        Swal.fire({
          icon: 'error',
          title: t('serverError'),
          text: t('tryAgainLater'),
          buttonsStyling: false,
          customClass: {
            confirmButton: 'custom-orange-button',
          },
        });
      }
    },
  });

  const isRtl = i18n.language === 'ar'; 

  // Apply inline styles using JavaScript
  const style = document.createElement('style');
  style.textContent = `
    .custom-orange-button {
      background-color: orange;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  return (
    isRtl ? (
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir="rtl">
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                color: 'orange',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                maxWidth: 400,
                margin: '15px auto',
                padding: 4,
                border: '1px solid #ddd',
                borderRadius: 2,
                backgroundColor: '#fff',
                ...placeholderStyle(i18n.language),
                ...(isRtl ? rtlStyle : {}),
              }}
            >
              <h2>{t('LogIn')}</h2>

              <TextField
                label={t('email')}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
                InputProps={{ style: placeholderStyle(i18n.language) }}
                InputLabelProps={{ sx: labelStyle(i18n.language) }}
              />

              <TextField
                label={t('password')}
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
                InputLabelProps={{ sx: labelStyle(i18n.language) }}
              />

              <Link
                href="/forget-password"
                variant="body2"
                sx={{
                  alignSelf: 'flex-end',
                  marginBottom: 1,
                  color: 'orange',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {t('forgotPassword')}
              </Link>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: 'orange',
                  '&:hover': {
                    backgroundColor: '#ff9800',
                  },
                }}
              >
                {t('LogIn')}
              </Button>
            </Box>
          </div>
        </ThemeProvider>
      </CacheProvider>
    ) : (
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color:'orange',
          gap: 2,
          maxWidth: 400,
          margin: '15px auto',
          padding: 4,
          border: '1px solid #ddd',
          borderRadius: 2,
          backgroundColor: '#fff',
          ...placeholderStyle(i18n.language),
        }}
      >
        <h2>{t('LogIn')}</h2>

        <TextField
          label={t('email')}
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
          InputProps={{ style: placeholderStyle(i18n.language) }}
          InputLabelProps={{ sx: labelStyle(i18n.language) }}
        />

        <TextField
          label={t('password')}
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
          InputLabelProps={{ sx: labelStyle(i18n.language) }}
        />

        <Link
          href="/forget-password"
          variant="body2"
          sx={{
            alignSelf: 'flex-end',
            marginBottom: 1,
            color: 'orange',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {t('forgotPassword')}
        </Link>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: 'orange',
            '&:hover': {
              backgroundColor: '#ff9800',
            },
          }}
        >
          {t('LogIn')}
        </Button>
      </Box>
    )
  );
};

export default LogIn;
