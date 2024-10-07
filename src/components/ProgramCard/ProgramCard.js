import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
const ProgramCard = ({ image, title, description,route }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar'; // Check if the current language is Arabic

  return (
    <Card sx={{ maxWidth: 345}}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: isRtl ? 'flex-end' : 'flex-start' }}>
          <Link 
            to={route} 
            style={{ textDecoration: 'none' }} // Remove default underline
          >
            <Box
              sx={{
                backgroundColor: 'orange',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '4px',
                '&:hover': { backgroundColor: 'darkorange' },
                display: 'inline-block',
                textAlign: 'center'
              }}
            >
              {t('more_details')}
            </Box>
          </Link>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProgramCard;
