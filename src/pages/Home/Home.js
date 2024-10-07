import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import StudentsCard from '../../components/StudentsCard/StudentsCard';
import TeachersCard from '../../components/TeachersCard/TeachersCard';
import LocalesCard from '../../components/LocalesCard/LocalesCard';
import ProgramsCard from '../../components/ProgramsCard/ProgramsCard';

function Home() {
  const { t, i18n } = useTranslation(); // Use i18n for translations
  const isArabic = i18n.language === 'ar'; // Check if the current language is Arabic

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        p: 3, 
        direction: isArabic ? 'rtl' : 'ltr', // Adjust text direction based on language
        textAlign: isArabic ? 'left' : 'right' // Align text based on language
      }}
    > 
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          mt: '30px', 
          textAlign: 'center', // Center the title
          color:'orange',
          fontWeight:'bold'
        }}
      >
        {t('welcometoControlPannel')} {/* Use translation key */}
      </Typography>
      <Grid container spacing={2} direction={isArabic ? 'row-reverse' : 'row'}>
        <Grid item xs={12} sm={6} md={6}>
          <StudentsCard />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TeachersCard />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <LocalesCard />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <ProgramsCard />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
