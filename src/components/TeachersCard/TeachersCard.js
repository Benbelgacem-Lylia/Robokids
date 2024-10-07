import React from 'react';
import { Card, CardContent, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';

const TeachersCard = () => {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <PersonIcon
        sx={{
          color: 'orange',
          fontSize: 40,
        }}
      />
      <CardContent
      >
        <Typography variant="h5">{t('teachersCount')}</Typography>
        <Typography variant="body2">{t('teachersText')}</Typography>
      </CardContent>
    </Card>
  );
};

export default TeachersCard;
