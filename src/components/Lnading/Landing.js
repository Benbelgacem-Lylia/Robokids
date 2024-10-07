import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import AnimatedText from '../AnimatedText/AnimatedText';
import ImageContainer from '../ImageContainer/ImageContainer';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Landing() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const isFrench = i18n.language === 'fr'; // Check if the current language is French

  return (
    <Box sx={{ flexGrow: 1, padding: 2,mb:'40px'}}>
      <Grid
        container
        spacing={2}
        direction={isRtl ? 'row-reverse' : 'row'} // Reverse the order if RTL
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
        >
          <Box
            sx={{
              height: { xs: 'auto', md: 'auto' },
              padding: 2,
              marginTop: { xs: 0, md: '50px' },
            }}
          >
            <AnimatedText />
            {/* The box containing text and the button */}
            <Box
              sx={{
                marginTop: isFrench ? {xs:'200px',md:'110px',lg:'50px'} : { xs: '20px', md: '20px' }, // Apply 100px margin if language is French
              }}
            >
              <Typography
                sx={{ fontSize: '18px', color: '#aaa', mt: '40px',mb:'20px' }}
              >
                {t('prepare_generations')}{' '}
                <Box component="span" sx={{ color: 'orange', fontWeight: 'bold' ,fontSize:"18px"}}>
                  {t('RoboKids')}
                </Box>
              </Typography>
              <Button
                component={Link}
                to="/registerkids"
                variant="contained"
                sx={{
                  fontSize:"18px",
                  textTransform: 'none',
                  backgroundColor: 'orange',
                  '&:hover': { backgroundColor: 'darkorange' },
                }}
              >
                {t('register_your_kid')}
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
        >
          <Box
            sx={{
              height: { xs: 'auto', md: 'auto' },
              padding: 2,
              marginTop: isFrench ? {md:'50px'}:'20px'
            }}
          >
            <ImageContainer />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Landing;
