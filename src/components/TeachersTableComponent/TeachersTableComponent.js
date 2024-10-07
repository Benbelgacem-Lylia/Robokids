import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Custom styled TableCell for the header with orange background
const StyledTableCell = styled(TableCell)({
  backgroundColor: 'orange',
  color: 'white',
  fontWeight: 'bold',
});

// Custom styled buttons with two different shades of orange
const EditButton = styled(Button)({
  backgroundColor: '#FF8C00', // Dark orange
  color: 'white',
  padding: '2px 8px',
  fontSize: '0.75rem', // Smaller font size
  marginRight: '5px',
  '&:hover': {
    backgroundColor: '#FF7F50', // Slightly lighter shade on hover
  },
});

const DeleteButton = styled(Button)({
  backgroundColor: '#FFA500', // Lighter orange
  color: 'white',
  padding: '2px 8px',
  fontSize: '0.75rem', // Smaller font size
  '&:hover': {
    backgroundColor: '#FF8C00', // Darker shade on hover
  },
});

const TeachersTableComponent = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Hook for navigation

  const deleteTeacher = async (id) => {
    // Confirm with SweetAlert
    const result = await Swal.fire({
      title: t('Are you sure?'),
      text: t('You won\'t be able to revert this!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF8C00', // Dark orange
      cancelButtonColor: '#d33',
      confirmButtonText: t('Yes, delete it!'),
      cancelButtonText: t('Cancel'),
    });
    if (result.isConfirmed) {
      try {
        // Log the ID for debugging
        console.log(`Deleting student with ID: ${id}`);

        // Send delete request using axios
        const response = await axios.delete(`http://localhost:9000/teachers/${id}`);

        // Check response status
        if (response.status === 200) {
          // Notify success
          Swal.fire({
            icon: 'success',
            title: t('Deleted!'),
            text: t('The student record has been deleted.'),
            confirmButtonColor: '#FF8C00', // Dark orange
          });

          // Refresh or update the table data
          // You may want to trigger a callback or state update here
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error deleting student:', error);
        // Notify error
        Swal.fire({
          icon: 'error',
          title: t('Oops!'),
          text: t('Something went wrong while deleting the record.'),
          confirmButtonColor: '#FF8C00', // Dark orange
        });
      }
    }
  };
  const handleEdit = (id) => {
    navigate(`/controlpannel/editteacher/${id}`); // Navigate to the edit page
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="teachers table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{t('id')}</StyledTableCell>
            <StyledTableCell>{t('Name')}</StyledTableCell>
            <StyledTableCell>{t('Email')}</StyledTableCell>
            <StyledTableCell>{t('Subject')}</StyledTableCell>
            <StyledTableCell align="center">{t('Actions')}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.id}</TableCell>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.subject}</TableCell>
              <TableCell align="center">
                {/* Container for buttons to ensure they are inline */}
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <EditButton variant="contained" size="small" onClick={() => handleEdit(teacher.id)}>
                    {t('Edit')}
                  </EditButton>
                  <DeleteButton variant="contained" size="small" onClick={() => deleteTeacher(teacher.id)}>
                    {t('Delete')}
                  </DeleteButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeachersTableComponent;
