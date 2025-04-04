import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import Header from './components/Header';
import TasksPage from './pages/TasksPage';
import theme from './theme';
import './App.css';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header onMenuClick={toggleDrawer(true)} onSearchChange={handleSearchChange} />
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <List sx={{ width: 250 }}>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemText primary="Tâches d'Inspection" />
            </ListItem>
            {/* Ajoute d'autres éléments de menu ici si nécessaire */}
          </List>
        </Drawer>
        <TasksPage searchQuery={searchQuery} />
      </div>
    </ThemeProvider>
  );
};

export default App;