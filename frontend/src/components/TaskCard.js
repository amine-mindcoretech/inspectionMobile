// import React from 'react';
// import { Card, CardContent, CardActionArea, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Box } from '@mui/material';

// const TaskCard = ({ task, onClick }) => {
//   return (
//     <Card sx={{ mb: 2, p: 1, borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
//       <CardActionArea onClick={() => onClick(task)}>
//         <CardContent>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h6" color="primary" fontWeight="bold">
//               {task.fieldData.Produit}
//             </Typography>
//             <Chip label={`Opération: ${task.fieldData.Operation}`} color="secondary" size="small" sx={{ fontWeight: 'medium' }} />
//           </Box>
//           <TableContainer>
//             <Table size="small" aria-label="task details table">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                   <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Champ</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Valeur</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
//                   <TableCell>Commande</TableCell>
//                   <TableCell>{task.fieldData.Commande}</TableCell>
//                 </TableRow>
//                 <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
//                   <TableCell>Job</TableCell>
//                   <TableCell>{task.fieldData.Job}</TableCell>
//                 </TableRow>
//                 <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
//                   <TableCell>WorkOrder</TableCell>
//                   <TableCell>{task.fieldData.WorkOrder}</TableCell>
//                 </TableRow>
//                 <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
//                   <TableCell>Quantité</TableCell>
//                   <TableCell>{task.fieldData.Quantite}</TableCell>
//                 </TableRow>
//                 <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
//                   <TableCell>Séquence</TableCell>
//                   <TableCell>{task.fieldData.Sequence}</TableCell>
//                 </TableRow>
//                 <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
//                   <TableCell>Date de livraison</TableCell>
//                   <TableCell>{task.fieldData.DateLivraison}</TableCell>
//                 </TableRow>
//                 <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
//                   <TableCell>Priorité</TableCell>
//                   <TableCell>{task.fieldData.WO_PRIO}</TableCell>
//                 </TableRow>
//                 <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
//                   <TableCell>Réf. Encaissage</TableCell>
//                   <TableCell>{task.fieldData.Ref_Encaissage || 'N/A'}</TableCell>
//                 </TableRow>
//                 <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
//                   <TableCell>Réf. Commande</TableCell>
//                   <TableCell>{task.fieldData.Ref_CommandeItem}</TableCell>
//                 </TableRow>
//                 <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
//                   <TableCell>Réf. Inspection</TableCell>
//                   <TableCell>{task.fieldData.Ref_Inspection}</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default TaskCard;

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
  IconButton,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Style pour le bouton ExpandMore
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

const TaskCard = ({ task, onClick }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (e) => {
    e.stopPropagation(); // Empêche le clic sur ExpandMore de déclencher onClick
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ mb: 2, p: 1, borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <CardActionArea onClick={() => onClick(task)}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {task.fieldData.Produit}
            </Typography>
            <Box display="flex" alignItems="center">
              <Chip
                label={`Opération: ${task.fieldData.Operation}`}
                color="secondary"
                size="small"
                sx={{ fontWeight: 'medium', mr: 1 }}
              />
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Box>
          </Box>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <TableContainer>
              <Table size="small" aria-label="task details table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Champ</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Valeur</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell>Commande</TableCell>
                    <TableCell>{task.fieldData.Commande}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell>Job</TableCell>
                    <TableCell>{task.fieldData.Job}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell>WorkOrder</TableCell>
                    <TableCell>{task.fieldData.WorkOrder}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell>Quantité</TableCell>
                    <TableCell>{task.fieldData.Quantite}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell>Séquence</TableCell>
                    <TableCell>{task.fieldData.Sequence}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell>Date de livraison</TableCell>
                    <TableCell>{task.fieldData.DateLivraison}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell>Priorité</TableCell>
                    <TableCell>{task.fieldData.WO_PRIO}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell>Réf. Encaissage</TableCell>
                    <TableCell>{task.fieldData.Ref_Encaissage || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell>Réf. Commande</TableCell>
                    <TableCell>{task.fieldData.Ref_CommandeItem}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell>Réf. Inspection</TableCell>
                    <TableCell>{task.fieldData.Ref_Inspection}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TaskCard;