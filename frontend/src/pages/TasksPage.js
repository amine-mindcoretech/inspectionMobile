import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Dialog } from '@mui/material';
import { fetchTasks } from '../services/api';
import TaskCard from '../components/TaskCard';
import Inspection from '../components/Inspection';
import LoadingSpinner from '../components/LoadingSpinner';

const TasksPage = ({ searchQuery }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        setFilteredTasks(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des tâches');
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredTasks(tasks);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = tasks.filter((task) => {
      const fields = [
        task.fieldData.Produit,
        task.fieldData.Commande,
        task.fieldData.Job,
        task.fieldData.WorkOrder,
        task.fieldData.Operation,
        task.fieldData.Ref_CommandeItem,
        task.fieldData.Ref_Inspection,
      ];
      return fields.some((field) => field && field.toLowerCase().includes(lowerCaseQuery));
    });

    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Liste des Tâches d'Inspection
      </Typography>
      <Box>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard key={task.recordId} task={task} onClick={handleCardClick} />
          ))
        ) : (
          <Typography align="center">Aucune tâche trouvée.</Typography>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {selectedTask && <Inspection task={selectedTask} />}
      </Dialog>
    </Container>
  );
};

export default TasksPage;