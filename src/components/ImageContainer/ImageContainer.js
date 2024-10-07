import * as React from 'react';
import Box from '@mui/material/Box';

function ImageContainer({ imageSrc }) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.2)',
        borderRadius: '15px',
        overflow: 'hidden',
        marginTop:{md:'60px',lg:'20px'}
      }}
    >
      <img src='/images/father-son-making-robot.jpg' alt="Contained" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </Box>
  );
}

export default ImageContainer;
