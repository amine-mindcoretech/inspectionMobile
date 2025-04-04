import React from 'react';
import { AppBar, Toolbar, IconButton, Box, TextField, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../assets/logo.png'; // Import du logo

const Header = ({ onMenuClick, onSearchChange }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Bouton de menu à gauche */}
        <IconButton edge="start" color="inherit" onClick={onMenuClick} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* Logo centré */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <img src={Logo} alt="Logo" style={{ height: '40px', objectFit: 'contain' }} />
        </Box>

        {/* Barre de recherche à droite */}
        <TextField
          variant="outlined"
          placeholder="Rechercher..."
          size="small"
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
            },
          }}
          sx={{ width: { xs: '150px', sm: '200px' } }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;