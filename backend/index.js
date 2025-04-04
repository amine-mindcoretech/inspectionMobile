// index.js
const express = require('express');
const cors = require('cors');
const tachesInspectionRoutes = require('./routes/tachesInspectionRoutes');
const tachesInspectionCompleteRoutes = require('./routes/tachesInspectionCompleteRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Permet les requêtes cross-origin
app.use(express.json()); // Parse les requêtes JSON

// Routes pour chaque table
app.use('/api/TachesInspection', tachesInspectionRoutes);
app.use('/api/taches-inspection-complete', tachesInspectionCompleteRoutes);
app.use('/api', apiRoutes);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur serveur inattendue' });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

