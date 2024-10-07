import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  InputLabel,
  Box,
  FormHelperText,
} from '@mui/material';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { CacheProvider } from '@emotion/react'; 
import createCache from '@emotion/cache'; 
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import rtlPlugin from 'stylis-plugin-rtl'; 
import axios from 'axios';

// Create RTL cache for Arabic
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

// Theme customization if needed
const theme = createTheme({
  direction: 'rtl',
});

const rtlStyle = {
  direction: 'rtl',
  textAlign: 'right',
};

const placeholderStyle = (lang) => ({
  textAlign: lang === 'ar' ? 'right' : 'left',
  direction: lang === 'ar' ? 'rtl' : 'ltr',
});
const SignUp = () => {
  const { t, i18n } = useTranslation();
  const [usedBefore, setUsedBefore] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      gender: '',
      usedBefore: false,
      department: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(t('firstName') + ' ' + t('isRequired')),
      lastName: Yup.string().required(t('lastName') + ' ' + t('isRequired')),
      email: Yup.string().email(t('invalidEmail')).required(t('email') + ' ' + t('isRequired')),
      password: Yup.string().min(8, t('passwordMinLength')).required(t('password') + ' ' + t('isRequired')),
      phoneNumber: Yup.string().required(t('phoneNumber') + ' ' + t('isRequired')),
      gender: Yup.string().required(t('gender') + ' ' + t('isRequired')),
      department: Yup.string().when('usedBefore', {
        is: true,
        then: (schema) => schema.required(t('department') + ' ' + t('isRequired')),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:9000/users', values);
        alert(t('registrationSuccess'));
      } catch (error) {
        console.error('Error during registration', error);
        alert(t('serverError'));
      }
    },
  });

  const isRtl = i18n.language === 'ar';

  return (
    isRtl ? (
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir="rtl">
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
                ...placeholderStyle(i18n.language),
                ...(isRtl ? rtlStyle : {}),
              }}
            >
              <h2>{t('signUp')}</h2>
              <TextField
                label={t('firstName')}
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                fullWidth
                InputProps={{ style: placeholderStyle(i18n.language) }}
              />

              <TextField
                label={t('lastName')}
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                fullWidth
                InputProps={{ style: placeholderStyle(i18n.language) }}
              />

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
                InputProps={{ style: placeholderStyle(i18n.language) }}
              />

              <FormControl fullWidth>
                <PhoneInput
                  inputComponent={TextField}
                  placeholder={t('phoneNumber')}
                  value={formik.values.phoneNumber}
                  onChange={(value) => formik.setFieldValue('phoneNumber', value)}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <FormHelperText error>{formik.errors.phoneNumber}</FormHelperText>
                )}
              </FormControl>

              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">{t('gender')}</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label={t('male')} />
                  <FormControlLabel value="female" control={<Radio />} label={t('female')} />
                </RadioGroup>
                {formik.touched.gender && formik.errors.gender && (
                  <FormHelperText error>{formik.errors.gender}</FormHelperText>
                )}
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.usedBefore}
                    onChange={(event) => {
                      formik.setFieldValue('usedBefore', event.target.checked);
                      setUsedBefore(event.target.checked);
                    }}
                  />
                }
                label={t('usedBefore')}
              />

              {usedBefore && (
                <FormControl fullWidth>
                  <InputLabel>{t('department')}</InputLabel>
                  <Select
                    name="department"
                    value={formik.values.department}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.department && Boolean(formik.errors.department)}
                    inputProps={{ style: placeholderStyle(i18n.language) }}
                  >
                    <MenuItem value="artificialIntelligence">{t('artificialIntelligence')}</MenuItem>
                    <MenuItem value="softwareEngineering">{t('softwareEngineering')}</MenuItem>
                    <MenuItem value="mechatronics">{t('mechatronics')}</MenuItem>
                  </Select>
                  {formik.touched.department && formik.errors.department && (
                    <FormHelperText error>{formik.errors.department}</FormHelperText>
                  )}
                </FormControl>
              )}

              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: 'orange', color: 'white', '&:hover': { backgroundColor: '#e69500' } }}
              >
                {t('signUp')}
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
      <h2>{t('signUp')}</h2>

      <TextField
        label={t('firstName')}
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        fullWidth
        InputProps={{ style: placeholderStyle(i18n.language) }}
      />

      <TextField
        label={t('lastName')}
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        fullWidth
        InputProps={{ style: placeholderStyle(i18n.language) }}
      />

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
        InputProps={{ style: placeholderStyle(i18n.language) }}
      />

      <FormControl fullWidth>
        <PhoneInput
          inputComponent={TextField}
          placeholder={t('phoneNumber')}
          value={formik.values.phoneNumber}
          onChange={(value) => formik.setFieldValue('phoneNumber', value)}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <FormHelperText error>{formik.errors.phoneNumber}</FormHelperText>
        )}
      </FormControl>

      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">{t('gender')}</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
        >
          <FormControlLabel value="male" control={<Radio />} label={t('male')} />
          <FormControlLabel value="female" control={<Radio />} label={t('female')} />
        </RadioGroup>
        {formik.touched.gender && formik.errors.gender && (
          <FormHelperText error>{formik.errors.gender}</FormHelperText>
        )}
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={formik.values.usedBefore}
            onChange={(event) => {
              formik.setFieldValue('usedBefore', event.target.checked);
              setUsedBefore(event.target.checked);
            }}
          />
        }
        label={t('usedBefore')}
      />

      {usedBefore && (
        <FormControl fullWidth>
          <InputLabel>{t('department')}</InputLabel>
          <Select
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.department && Boolean(formik.errors.department)}
            inputProps={{ style: placeholderStyle(i18n.language) }}
          >
            <MenuItem value="artificialIntelligence">{t('artificialIntelligence')}</MenuItem>
            <MenuItem value="softwareEngineering">{t('softwareEngineering')}</MenuItem>
            <MenuItem value="mechatronics">{t('mechatronics')}</MenuItem>
          </Select>
          {formik.touched.department && formik.errors.department && (
            <FormHelperText error>{formik.errors.department}</FormHelperText>
          )}
        </FormControl>
      )}

      <Button
        type="submit"
        variant="contained"
        sx={{ backgroundColor: 'orange', color: 'white', '&:hover': { backgroundColor: '#e69500' } }}
      >
        {t('signUp')}
      </Button>
      </Box>
  )
  )
}

export default SignUp;
