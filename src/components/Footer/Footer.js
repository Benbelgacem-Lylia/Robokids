import React from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar'; // Check if the current language is Arabic

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'orange',
        color: '#fff',
        padding: '20px 0',
        textAlign: isRtl ? 'right' : 'center', // Align text to the right for RTL languages
        direction: isRtl ? 'rtl' : 'ltr', // Set text direction to RTL for Arabic
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="inherit">
          {t('footer_copy_rights', { year: new Date().getFullYear() })}
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: isRtl ? 'flex-end' : 'center', // Align icons to the end for RTL languages
            gap: 2,
          }}
        >
          <IconButton
            component="a"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            aria-label={t('facebook')}
          >
            <Facebook />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            aria-label={t('instagram')}
          >
            <Instagram />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            aria-label={t('linkedin')}
          >
            <LinkedIn />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
