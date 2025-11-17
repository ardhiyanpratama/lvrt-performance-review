const express = require('express');
const router = express.Router();
const db = require('../models');
const { exists } = require('fs');
const SoftCompetency = db.Softcompetencies;

/**
     * @swagger
     * tags:
     *   name: Soft Competencies
     *   description: Soft Competencies management API
     */

// Example: GET /api/softcompetencies
router.get('/softcompetencies', async (req, res) => {
    try {
        const { titleId, departmentId } = req.query;

        const where = {};

        if (titleId) {
            where.titleId = titleId;
        }
        if (departmentId) {
            where.departmentId = departmentId;
        }

        const softCompetencies = await SoftCompetency.findAll({ where });

        if (softCompetencies.length === 0) {
            return res.status(404).json({ message: 'No soft competencies found' });
        }

        return res.json({
            exists: true,
            message: 'Success',
            data: softCompetencies
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch hard competencies' });
    }
});

module.exports = router;