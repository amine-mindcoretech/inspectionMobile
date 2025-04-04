//Routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const FilemakerService = require('../services/filemakerService');

// Route pour récupérer les données de Taches_Inspection (via EcranMain_Inspection Copy)
router.get('/taches-inspection', async (req, res) => {
    try {
        const data = await FilemakerService.getRecords('EcranMain_Inspection Copy');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour récupérer les données de TachesInspectionComplete (via Taches Inspection Complétée)
router.get('/taches-inspection-complete', async (req, res) => {
    try {
        const data = await FilemakerService.getRecords('Taches Inspection Complétée');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route générique pour tester d'autres layouts (facultatif, pour garder la flexibilité)
router.get('/data/:layout', async (req, res) => {
    const { layout } = req.params;
    try {
        const data = await FilemakerService.getRecords(layout);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;