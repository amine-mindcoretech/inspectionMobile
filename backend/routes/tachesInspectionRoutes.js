const express = require('express');
const router = express.Router();
const FilemakerService = require('../services/filemakerService');
const config = require('../config/tachesInspectionConfig');

// Route pour récupérer les données de Taches_Inspection
router.get('/', async (req, res) => {
    try {
        const data = await FilemakerService.getRecords(config.layoutName, config.limit);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;