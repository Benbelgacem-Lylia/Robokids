import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import TableComponent from '../../components/StudentTableComponent/StudentTableComponent';
import { useTranslation } from 'react-i18next';

const MechaStudents = () => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/students');
        const data = await response.json();
        // Filter students based on the studyProgram
        const filteredStudents = data.filter(student => student.studyProgram === 'mechatronics');
        setStudents(filteredStudents);
      } catch (error) {
        console.error('Error fetching students data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: '50px' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'orange', fontWeight: 'bold' }}>
        {t('Mechatronicsstudents')}
      </Typography>
      <TableComponent data={students} />
    </Container>
  );
};

export default MechaStudents;
