const express = require('express');
const router = express.Router();
const db = require('../models');
const Department = db.Department;

/**
     * @swagger
     * tags:
     *   name: Departments
     *   description: Department management API
     */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with email and password.
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful.
 *       401:
 *         description: Invalid email
 *       500:
 *         description: Server error
 */
router.get('/department', async (req, res) => {
  try {

    const { id } = req.query;

    const where = {};

    if(id){
      where.id = id;
    }

      const result = await Department.findAll({
          where
      });

    if (result.length > 0) {
      return res.json({ exists: true, message: 'Success.', data: result });
    }

    res.json({ exists: false, message: 'Failed. department not found.' });
  } catch (error) {
    console.error('Error get department:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
