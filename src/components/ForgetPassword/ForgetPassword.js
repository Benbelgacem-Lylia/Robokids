import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Box, Typography } from '@mui/material';

// Function to apply styles based on the current language
const placeholderStyle = (lang) => ({
  textAlign: lang === 'ar' ? 'right' : 'left',
  direction: lang === 'ar' ? 'rtl' : 'ltr',
});

// Function to apply label alignment based on the current language
const labelStyle = (lang) => ({
  textAlign: lang === 'ar' ? 'right' : 'left',
  marginRight: lang === 'ar' ? 0 : 'auto',
  marginLeft: lang === 'ar' ? 'auto' : 0,
  paddingRight: lang === 'ar' ? '0px' : '20px',
  paddingLeft: lang === 'ar' ? '20px' : '0px',
});

const ForgetPassword = () => {
  const { t, i18n } = useTranslation(); // Hook to handle translations
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('invalidEmail')) // Translation for invalid email message
        .required(t('email') + ' ' + t('isRequired')), // Translation for email required message
    }),
    onSubmit: (values) => {
      // Simulate sending a new password
      setSubmitted(true);
      console.log(values); // Placeholder for form submission logic
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
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
        ...placeholderStyle(i18n.language), // Apply placeholder alignment based on language
        ...(i18n.language === 'ar' ? { direction: 'rtl', textAlign: 'right' } : {}), // Apply RTL style if the language is Arabic
      }}
    >
      <h2>{t('ForgetPassword')}</h2> {/* Translated title */}

      {submitted ? (
        <Typography variant="body1" color="green">
          {t('newPasswordSent')} {/* Translated success message */}
        </Typography>
      ) : (
        <>
          <TextField
            label={t('email')} // Translated label for email
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            InputProps={{ style: placeholderStyle(i18n.language) }} // Apply custom placeholder style
            InputLabelProps={{ sx: labelStyle(i18n.language) }} // Apply label alignment
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'orange', // Set button color to orange
              '&:hover': {
                backgroundColor: '#ff9800', // Slightly darker shade on hover
              },
            }}
          >
            {t('submit')} {/* Translated button text */}
          </Button>
        </>
      )}
    </Box>
  );
};

export default ForgetPassword;
