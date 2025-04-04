import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Checkbox,
  IconButton,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Inspection = ({ task }) => {
  const [pendingItems, setPendingItems] = useState([]);
  const [validatedItems, setValidatedItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const quantity = parseInt(task.fieldData.Quantite, 10) || 0;
    const initialItems = Array.from({ length: quantity }, (_, index) => ({
      id: index,
      product: task.fieldData.Produit,
      serialNumber: '',
      checked: false,
    }));
    setPendingItems(initialItems);
  }, [task]);

  const isSerialNumberUnique = (serialNumber, currentId) => {
    const allSerialNumbers = [
      ...pendingItems
        .filter((item) => item.id !== currentId && item.serialNumber)
        .map((item) => item.serialNumber),
      ...validatedItems
        .filter((item) => item.serialNumber)
        .map((item) => item.serialNumber),
    ];
    return !allSerialNumbers.includes(serialNumber);
  };

  const handleSerialNumberChange = (id, value) => {
    setPendingItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, serialNumber: value, checked: false } : item
      )
    );
    setError('');
  };

  const handleCheckboxChange = (id) => {
    const item = pendingItems.find((item) => item.id === id);
    if (!item.serialNumber) {
      setError('Veuillez saisir un numéro de série');
      return;
    }

    if (!isSerialNumberUnique(item.serialNumber, id)) {
      setError('Ce numéro de série est déjà utilisé');
      return;
    }

    setPendingItems((prev) => prev.filter((item) => item.id !== id));
    setValidatedItems((prev) => [...prev, { ...item, checked: true }]);
    setError('');
  };

  const handleDelete = (id) => {
    const item = validatedItems.find((item) => item.id === id);
    setValidatedItems((prev) => prev.filter((item) => item.id !== id));
    setPendingItems((prev) => [...prev, { ...item, serialNumber: '', checked: false }]);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        p: { xs: 1, sm: 2 },
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="h5"
        color="primary"
        gutterBottom
        sx={{ textAlign: 'center', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
      >
        Détails de l'Inspection
      </Typography>

      {/* Afficher une erreur si elle existe */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Première Box : Lignes à valider */}
      <Card sx={{ mb: 2, borderRadius: 3, flexShrink: 0 }}>
        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Produits à Inspecter (Quantité : {task.fieldData.Quantite})
          </Typography>
          {pendingItems.length > 0 ? (
            <TableContainer>
              <Table size="small" aria-label="pending items table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Produit
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Numéro de Série
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Valider
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingItems.map((item) => (
                    <TableRow key={item.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{item.product}</TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={item.serialNumber}
                          onChange={(e) => handleSerialNumberChange(item.id, e.target.value)}
                          placeholder="Numéro de série"
                          sx={{
                            width: { xs: '100px', sm: '150px' },
                            '& .MuiInputBase-input': { fontSize: { xs: '0.75rem', sm: '0.875rem' } },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={item.checked}
                          onChange={() => handleCheckboxChange(item.id)}
                          color="primary"
                          sx={{ p: 0 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography color="textSecondary" align="center" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              Aucun produit à inspecter.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Deuxième Box : Lignes validées */}
      <Card sx={{ borderRadius: 3, flexShrink: 0 }}>
        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Produits Inspectés
          </Typography>
          {validatedItems.length > 0 ? (
            <TableContainer>
              <Table size="small" aria-label="validated items table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Produit
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Numéro de Série
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {validatedItems.map((item) => (
                    <TableRow key={item.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{item.product}</TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{item.serialNumber}</TableCell>
                      <TableCell>
                        <IconButton color="error" onClick={() => handleDelete(item.id)} sx={{ p: 0 }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography color="textSecondary" align="center" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              Aucun produit inspecté.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Inspection;