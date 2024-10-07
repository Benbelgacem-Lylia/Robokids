import React from 'react';
import { Grid, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Location = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar'; // Check if the current language is Arabic

  return (
    <Container id="location" sx={{ padding: '2rem 0' }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'orange' }} 
      >
        {i18n.t('where_we_are')}
      </Typography>
      <Grid 
        container 
        spacing={4} 
        alignItems="center"
        sx={{ flexDirection: isRtl ? 'row-reverse' : 'row' }} // Reverse the row direction for RTL languages
      >
        <Grid item xs={12} md={6}>
          <img 
            src="/images/algbg.png" 
            alt="Location"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography 
            variant="body1" 
            align="justify"
            sx={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#4A4A4A', 
              padding: '1rem',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {i18n.t('location_part1')} 
            <span style={{ color: 'orange', fontWeight: 'bold' }}>
              {i18n.t('location_part2')}
            </span> 
            {i18n.t('location_part3')}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Location;
