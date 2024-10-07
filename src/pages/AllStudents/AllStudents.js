import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import TableComponent from '../../components/StudentTableComponent/StudentTableComponent';
import { useTranslation } from 'react-i18next';
const AllStudent = () => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  // Fetch student data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/students');
        const data = await response.json();
        setStudents(data); 
      } catch (error) {
        console.error('Error fetching students data:', error);
      }
    };
    fetchData();
  }, []);
  return (
      <Container maxWidth="md" sx={{marginTop: '50px'}}>
        <Typography variant="h4" component="h2" gutterBottom sx={{color:'orange',fontWeight:'bold'}}>
          {t('studentsinformations')}
        </Typography>
        <TableComponent data={students}/>
      </Container>
  );
};

export default AllStudent;
