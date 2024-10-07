import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTranslation } from 'react-i18next';

const TeacherCard = ({ image, name, qualification, linkedinUrl }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar'; // Check if the current language is Arabic

  return (
    <Card sx={{ maxWidth: 345, height: 450, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="350"  // Fixed height for the image section
        image={image}
        alt={name}
      />
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2, 
          height: '60px', 
          flexDirection: isRtl ? 'row-reverse' : 'row' // Reverse the row direction for RTL languages
        }}
      >
        <IconButton 
          component="a" 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          sx={{ fontSize: 30, mr: isRtl ? 0 : 2, ml: isRtl ? 2 : 0 }} // Adjust margins based on language
        >
          <LinkedInIcon sx={{ fontSize: 'inherit' }} color="primary" />
        </IconButton>
        <CardContent sx={{ flex: 1, textAlign: isRtl ? 'right' : 'left' }}>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {qualification}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default TeacherCard;
