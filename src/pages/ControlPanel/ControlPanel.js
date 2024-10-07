import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const ControlPanel = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar'; // Check if the current language is Arabic

  return (
    <Box sx={{ display: 'flex', direction: isArabic ? 'rtl' : 'ltr' }}> {/* Apply RTL or LTR direction */}
      <Sidebar />
      <Outlet />
    </Box>
  );
};

export default ControlPanel;
