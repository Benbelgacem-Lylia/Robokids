import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, useMediaQuery, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

const GenderStatistics = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [genderStats, setGenderStats] = useState({ male: 0, female: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9000/students')
      .then(response => {
        const students = response.data;
        const maleCount = students.filter(student => student.gender.toLowerCase() === 'male').length;
        const femaleCount = students.filter(student => student.gender.toLowerCase() === 'female').length;
        setGenderStats({ male: maleCount, female: femaleCount });
        setData([
          { name: 'Male', value: maleCount },
          { name: 'Female', value: femaleCount },
        ]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  const renderCustomLegend = ({ payload }) => (
    <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} style={{ display: 'inline-block', margin: '0 10px' }}>
          <span style={{ color: entry.color }}>{t(entry.payload.name)}</span>
        </li>
      ))}
    </ul>
  );

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) return <Typography>{t('Loading')}</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'orange', fontWeight: 'bold' }}>
        {t('GenderDistribution')}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          padding: '20px',
          textAlign: 'center',
          borderRadius: '0px',
          boxShadow: 'none'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: isSmallScreen ? '300px' : '500px'
        }}>
          <PieChart width={isSmallScreen ? 300 : 500} height={isSmallScreen ? 300 : 500}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={isSmallScreen ? 80 : 200}
              innerRadius={isSmallScreen ? 40 : 100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#00C49F' : '#FF8042'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend content={renderCustomLegend} />
          </PieChart>
        </div>
        <Typography variant="h6" gutterBottom>
          {t('MaleGender')} {genderStats.male}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {t('FemaleGender')} {genderStats.female}
        </Typography>
      </Paper>
    </Container>
  );
};

export default GenderStatistics;
