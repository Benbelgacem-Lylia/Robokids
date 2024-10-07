import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import TeachersTableComponent from '../../components/TeachersTableComponent/TeachersTableComponent';
import { useTranslation } from 'react-i18next';
const AllTeachers = () => {
  const { t } = useTranslation();
  const [teachers, setTeachers] = useState([]);

  // Fetch student data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/teachers');
        const data = await response.json();
        setTeachers(data); 
      } catch (error) {
        console.error('Error fetching students data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{marginTop: '50px'}}>
        <Typography variant="h4" component="h2" gutterBottom sx={{color:"orange",fontWeight:"bold"}}>
          {t('Teachersinformation')}
        </Typography>
        <TeachersTableComponent data={teachers}/>
      </Container>
  );
};

export default AllTeachers;
