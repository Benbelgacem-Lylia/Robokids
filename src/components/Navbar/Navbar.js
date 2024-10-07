import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import { useTranslation } from 'react-i18next';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Initialize the language state with the current language or default to 'en'
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Update state when i18n.language changes
    setLanguage(i18n.language);
  }, [i18n.language]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const isRTL = language === 'ar'; // Check if the selected language is Arabic

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        direction: isRTL ? 'rtl' : 'ltr', // Apply RTL direction if Arabic
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: isRTL ? 'flex-start' : 'flex-start', // Adjust alignment for RTL
            direction: isRTL ? 'rtl' : 'ltr', // Ensure direction is applied to this container
          }}
        >
          <RouterLink to="/">
            <img
              src="/images/logo-robokids.PNG"
              alt="Logo"
              style={{
                marginRight: isRTL ? 8 : 0, // Adjust margin for RTL
                marginLeft: isRTL ? 0 : 8, // Adjust margin for RTL
                height: '40px',
              }}
            />
          </RouterLink>
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ color: 'black', cursor: 'pointer',ml:'5px',mr:'5px' }}>
              {t('RoboKids')}
            </Typography>
          </RouterLink>

          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: isRTL ? 0 : 2,
                mr: isRTL ? 2 : 0,
                flexDirection: isRTL ? 'row-reverse' : 'row', // Reverse direction for RTL
              }}
            >
              <Button component="a" href="#program" color="inherit" sx={{ color: 'black', textTransform: 'none',fontSize:'16px' }}>{t('program')}</Button>
              <Button component="a" href="#teachers" color="inherit" sx={{ color: 'black', textTransform: 'none',fontSize:'16px'  }}>{t('teachers')}</Button>
              <Button component="a" href="#location" color="inherit" sx={{ color: 'black', textTransform: 'none',fontSize:'16px'  }}>{t('location')}</Button>
            </Box>
          )}
        </Box>
        {isMobile ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl variant="standard" sx={{ mr: 2 }}>
              <Select
                value={language}
                onChange={handleLanguageChange}
                sx={{
                  color: 'black',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  '&:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                  '&:focus': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                  '&:before': {
                    borderBottomColor: 'orange',
                  },
                  '&:after': {
                    borderBottomColor: 'orange',
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="ar">Arabic</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component="a" href="#program">{t('program')}</MenuItem>
              <MenuItem onClick={handleClose} component="a" href="#teachers">{t('teachers')}</MenuItem>
              <MenuItem onClick={handleClose} component="a" href="#location">{t('location')}</MenuItem>
              <MenuItem component={RouterLink}  to="/signup" onClick={handleClose}>{t('signUp')}</MenuItem>
              <MenuItem component={RouterLink}  to="/login" onClick={handleClose}>{t('signIn')}</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl variant="standard" sx={{ mr: 2 }}>
              <Select
                value={language}
                onChange={handleLanguageChange}
                sx={{
                  color: 'black',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  '&:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                  '&:focus': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                  '&:before': {
                    borderBottomColor: 'orange',
                  },
                  '&:after': {
                    borderBottomColor: 'orange',
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="ar">Arabic</MenuItem>
              </Select>
            </FormControl>
            <Link
              component={RouterLink} 
              to="/signup"
              sx={{
                backgroundColor: 'orange',
                color: 'white',
                padding: '8px 16px', 
                textDecoration: 'none', 
                borderRadius: '4px', 
                '&:hover': {
                  backgroundColor: 'darkorange',
                },
                mr: 1,
              }}
            >
              {t('signUp')}
            </Link>

            <Link
              component={RouterLink} 
              to="/login"
              sx={{
                backgroundColor: 'orange',
                color: 'white',
                padding: '8px 16px', 
                textDecoration: 'none', 
                borderRadius: '4px', 
                '&:hover': {
                  backgroundColor: 'darkorange',
                },
                mr: 1,
              }}
            >
              {t('signIn')}
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
