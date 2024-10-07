import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Divider, Box, ListItemIcon, IconButton, useMediaQuery, useTheme } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'; // Importing an appropriate icon for mechatronics
import CodeIcon from '@mui/icons-material/Code'; // Importing an icon suitable for software engineering
import WifiIcon from '@mui/icons-material/Wifi'; // Importing an icon suitable for IoT
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t, i18n } = useTranslation(); // Use i18n for translations
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;
  const orangeColor = '#FF9800';
  const grayColor = '#9E9E9E';

  // Determine sidebar position based on language
  const sidebarPosition = i18n.language === 'ar' ? 'right' : 'left';

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Toggle button for mobile screens */}
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ position: 'fixed', top: 16, [sidebarPosition]: 16, zIndex: 1201 }} // Position based on language
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor={sidebarPosition} // Adjust anchor based on language
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: isMobile ? 'block' : 'flex',
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        {/* Close button for mobile screens */}
        {isMobile && (
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', top: 16, [sidebarPosition]: 16, zIndex: 1201 }} // Position based on language
          >
            <CloseIcon />
          </IconButton>
        )}

        <Box display="flex" alignItems="center" sx={{ padding: '16px', color: orangeColor }}>
          <SchoolIcon sx={{ marginRight: '8px' }} />
          <Typography variant="h6">{t('schoolControlPanel')}</Typography> {/* Translation key */}
        </Box>
        <Divider />
        <List>
          <ListItem 
            component={Link} 
            to="/controlpannel/home" 
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: orangeColor }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t('home')} sx={{ textAlign: 'center', color: grayColor }} />
          </ListItem>
          <Divider sx={{ borderColor: orangeColor, marginY: '8px' }} />
          <ListItem 
            component={Link} 
            to="/controlpannel/allstudents" 
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: orangeColor }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={t('allStudents')} sx={{ textAlign: 'center', color: grayColor }} />
          </ListItem>
          <Divider sx={{ borderColor: orangeColor, marginY: '8px' }} />
          <ListItem
            component={Link}
            to="/controlpannel/prepastudents" // Updated route
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: orangeColor }}>
              <SchoolIcon /> {/* Updated icon for Preparatory Cycle */}
            </ListItemIcon>
            <ListItemText primary={t('PreparatoryCycleStudents')} sx={{  color: grayColor }} /> {/* Updated title */}
          </ListItem>
          <Divider sx={{ borderColor: orangeColor, marginY: '8px' }} />
          <ListItem
            component={Link}
            to="/controlpannel/mechastudents" // Updated route
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: orangeColor }}>
              <PrecisionManufacturingIcon /> {/* Updated icon */}
            </ListItemIcon>
            <ListItemText primary={t('Mechatronicsstudents')} sx={{ color: grayColor }} /> {/* Updated title */}
          </ListItem>
          <Divider sx={{ borderColor: orangeColor, marginY: '8px' }} />
          <ListItem
            component={Link}
            to="/controlpannel/softstudents" // Updated route
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: orangeColor }}>
              <CodeIcon /> {/* Updated icon */}
            </ListItemIcon>
            <ListItemText primary={t('SoftStudents')} sx={{ color: grayColor }} /> {/* Updated title */}
          </ListItem>
          <Divider sx={{ borderColor: orangeColor, marginY: '8px' }} />
          <ListItem
            component={Link}
            to="/controlpannel/iotstudents" // Updated route
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: orangeColor }}>
              <WifiIcon /> {/* Updated icon for IoT */}
            </ListItemIcon>
            <ListItemText primary={t('IotStudents')} sx={{ textAlign: 'center', color: grayColor }} /> {/* Updated title */}
          </ListItem>
          <Divider sx={{ borderColor: orangeColor, marginY: '8px' }} />
          <ListItem 
            component={Link} 
            to="/controlpannel/addstudent" 
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: orangeColor }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={t('addStudent')} sx={{ textAlign: 'center', color: grayColor }} />
          </ListItem>
          <Divider sx={{ borderColor: orangeColor, marginY: '8px' }} />
          <ListItem 
            component={Link} 
            to="/controlpannel/allteachers" 
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: orangeColor }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={t('allTeachers')} sx={{ textAlign: 'center', color: grayColor }} />
          </ListItem>
          <Divider sx={{ borderColor: orangeColor, marginY: '8px' }} />
          <ListItem 
            component={Link} 
            to="/controlpannel/addteacher" 
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: orangeColor }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={t('addTeacher')} sx={{ textAlign: 'center', color: grayColor }} />
          </ListItem> 
          <Divider sx={{ borderColor: orangeColor, marginY: '8px' }} />
          <ListItem  
            component={Link} 
            to="/controlpannel/planning" 
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: orangeColor }}>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary={t('planning')} sx={{ textAlign: 'center', color: grayColor }} />
          </ListItem>
          <Divider sx={{ borderColor: orangeColor, marginY: '8px' }} />
          <ListItem  
            component={Link} 
            to="/controlpannel/statistics" 
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ color: orangeColor }}>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary={t('statistics')} sx={{ textAlign: 'center', color: grayColor }} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
