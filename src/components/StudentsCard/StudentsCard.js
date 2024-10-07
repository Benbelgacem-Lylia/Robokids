import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const StudentsCard = () => {
  const { t } = useTranslation();

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
      <PersonIcon sx={{ color: 'orange', fontSize: 40 }} />
      <CardContent>
        <Typography variant="h5">{t('studentsCount')}</Typography>
        <Typography variant="body2">{t('studentsText')}</Typography>
      </CardContent>
    </Card>
  );
};

export default StudentsCard;
