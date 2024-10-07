import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import TeacherCard from '../TeacherCard/TeacherCard';
import { useTranslation } from 'react-i18next';

const Teachers = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar'; // Check if the current language is Arabic

  const teamMembers = [
    {
      name: t('Zellat Khadidja'),
      qualification: t('PHD in Electronics'),
      image: '/images/t4.png', 
      linkedinUrl: 'https://www.linkedin.com/in/teacher1',
    },
    {
      name: t('Chouaf Saloua'),
      qualification: t('PHD in Computer Science'),
      image: '/images/t2222.png',
      linkedinUrl: 'https://www.linkedin.com/in/teacher2',
    },
    {
      name: t('Zeid Idikira'),
      qualification: t('PHD in Artificial Intelligence'),
      image: '/images/t3.png',
      linkedinUrl: 'https://www.linkedin.com/in/teacher3',
    },
    {
      name: t('Boudiar Toufik'),
      qualification: t('PHD in Business'),
      image: '/images/t1.png',
      linkedinUrl: 'https://www.linkedin.com/in/teacher4',
    },
  ];

  return (
    <Container 
      id="teachers"
      sx={{
        maxWidth: 'lg',
        marginTop: { xs: '30px',md:"50px"},
        marginBottom: { xs: '40px',md:"50px"},
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
          {t('Our Team')}
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <TeacherCard 
              image={member.image}
              name={member.name}
              qualification={member.qualification}
              linkedinUrl={member.linkedinUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Teachers;
