import React from 'react';
import { Grid, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AiProgram = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar'; // Check if the current language is Arabic

  return (
    <Container id="location" sx={{ padding: '2rem 0' }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'orange', marginBottom:'30px'}} 
      >
        {i18n.t('AiProgram')}
      </Typography>
      <Grid 
        container 
        spacing={4} 
        alignItems="center"
        sx={{ flexDirection: isRtl ? 'row-reverse' : 'row' }} // Reverse the row direction for RTL languages
      >
        <Grid item xs={12} md={6}>
          <img 
            src="/images/Ai.jpg" 
            alt="robotics"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography 
            variant="body1"
            align="justify"
            sx={{
                fontSize: '1.2rem',
                lineHeight: '1.8',
                color: 'orange', // Neutral dark grey for text
                backgroundColor: '#FFF3E0', // Light orange background
                padding: '1.5rem',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)', // Subtle shadow for slight depth
                textAlign: isRtl ? 'right' : 'left', // Adjusts text alignment based on language direction
            }}
          >
            {i18n.t('AiProgramText')} 
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AiProgram;
