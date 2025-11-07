const express = require('express');
const router = express.Router();
const Department = require('../models/departement');

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
router.get('/departement', async (req, res) => {
  try {

      const result = await Department.findAll({
          where: {
              isActive: true,
              isDelete:false
          }
      });

    if (result.length > 0) {
      return res.json({ exists: true, message: 'Success.', data: result });
    }

    res.json({ exists: false, message: 'Failed. Department not found.' });
  } catch (error) {
    console.error('Error get department:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
