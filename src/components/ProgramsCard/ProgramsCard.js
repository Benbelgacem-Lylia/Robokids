import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useTranslation } from 'react-i18next';
const ProgramsCard = () => {
  const { t } = useTranslation();
  return(
    <Card sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
    <SchoolIcon sx={{ color: 'orange', fontSize: 40 }} />
    <CardContent>
      <Typography variant="h5">{t('programsCount')}</Typography>
      <Typography variant="body2">{t('programsText')}</Typography>
    </CardContent>
    </Card>
  )
}
  
  


export default ProgramsCard;
