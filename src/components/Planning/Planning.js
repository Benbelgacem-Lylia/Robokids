import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
const Root = styled(Box)({
  backgroundColor: '#fff6e5', // Light orange background
  padding: '32px',
  textAlign: 'center',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Title = styled(Typography)({
  color: '#ff9800', // Main orange color
  marginBottom: '16px',
  fontWeight: 'bold',
});

const StyledCard = styled(Card)({
  backgroundColor: '#ffffff',
  border: '1px solid #ff9800',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: '16px 0', // Add margin to separate stacked cards
});

const CardContentText = styled(CardContent)({
  color: '#333',
});

const StyledButton = styled(Button)({
  backgroundColor: '#ff9800',
  color: '#fff',
  marginTop: '16px',
  '&:hover': {
    backgroundColor: '#e68a00',
  },
});

const Planning = () => {
  const { t } = useTranslation();
  return (
    <Root>
      <Title variant="h4">{t('WeeklyPlanning')}</Title>
      <Grid container spacing={3} justifyContent="center">
        {[t('Monday'), t('Wednesday'), t('Friday')].map((day) => (
          <Grid item xs={12} key={day}>
            <StyledCard>
              <CardContentText>
                <Typography variant="h6" gutterBottom>
                  {day}
                </Typography>
                <Typography variant="body2">
                  {t('PlanningText')}
                </Typography>
                <StyledButton variant="contained">{t('JoinNow')}</StyledButton>
              </CardContentText>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default Planning;
