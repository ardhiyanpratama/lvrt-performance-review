const express = require('express');
const router = express.Router();
const db = require('../models');
const { exists } = require('fs');
const HardCompetency = db.Hardcompetencies;

/**
     * @swagger
     * tags:
     *   name: Hard Competencies
     *   description: Hard Competencies management API
     */

// Example: GET /api/hardcompetencies
router.get('/hardcompetencies', async (req, res) => {
    try {
        const { titleId, departmentId } = req.query;

        const where = {};

        if (titleId) {
            where.titleId = titleId;
        }
        if (departmentId) {
            where.departmentId = departmentId;
        }

        console.log('Query Parameters:', req.query);

        const hardCompetencies = await HardCompetency.findAll({ where });

        if (hardCompetencies.length === 0) {
            return res.status(404).json({ message: 'No hard competencies found' });
        }

        return res.json({
            exists: true,
            message: 'Success',
            data: hardCompetencies
        });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch hard competencies' });
    }
});

module.exports = router;