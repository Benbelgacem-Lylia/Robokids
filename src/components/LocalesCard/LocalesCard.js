import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import { useTranslation } from 'react-i18next';
const LocalesCard = () => {
  const { t } = useTranslation();
  return(
  <Card sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
    <RoomIcon sx={{ color: 'orange', fontSize: 40 }} />
    <CardContent>
      <Typography variant="h5">{t('localesCount')}</Typography>
      <Typography variant="body2">{t('localesText')}</Typography>
    </CardContent>
  </Card>
)
}

export default LocalesCard;
