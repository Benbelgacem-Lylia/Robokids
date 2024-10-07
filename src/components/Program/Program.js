import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ProgramCard from '../ProgramCard/ProgramCard';
import { useTranslation } from 'react-i18next';

const Program = () => {
  const { t } = useTranslation();

  const programs = [
    {
      title: t('programs.robotics_title'),
      description: t('programs.robotics_description'),
      image: '/images/p11.PNG', 
      route:'/robotics',
    },
    {
      title: t('programs.programming_title'),
      description: t('programs.programming_description'),
      image: '/images/p2.jpg', 
      route:'/programming',
    },
    {
      title: t('programs.ai_title'),
      description: t('programs.ai_description'),
      image: '/images/p3.PNG', 
      route:'/aiprogram'
    },
    {
      title: t('programs.business_title'),
      description: t('programs.business_description'),
      image: '/images/p4.PNG', 
      route:'/business'
    },
  ];

  return (
    <Container id="program" 
      sx={{ 
        maxWidth: 'lg',
        marginTop: {xs:'40px',md:"70px"},
        marginBottom: {xs:'40px',md:"70px"},
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
        variant="h4" 
        align="center" 
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'orange' }} 
        >
          {t('programs.heading')}
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {programs.map((program, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ProgramCard 
              image={program.image}
              title={program.title}
              description={program.description} 
              route={program.route}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Program;
