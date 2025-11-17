const express = require('express');
const router = express.Router();
const db = require('../models');
const Employee = db.Employee;

/**
     * @swagger
     * tags:
     *   name: Employees
     *   description: Employee management API
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
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;

    console.log('Login attempt with email:', email);

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const employee = await Employee.findOne({ where: { email } });

    if (employee) {
      return res.json({
        exists: true,
        message: 'Login successful.',
        data: { id: employee.id, email: employee.email, name: employee.name, departement: employee.departmentId }
      });
    }

    res.json({ exists: false, message: 'Login failed. User not found.' });
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

//GET EMPLOYEE
router.get('/employee', async (req, res) => {
  try {

    const { email, id } = req.query;

    const where = {};

    if(id){
      where.id = id;
    }

    if(email){
      where.email = email;
    }

    const employee = await Employee.findOne({
      where: where
    });

    if (employee) {
      return res.json({ exists: true, message: 'Success', data: employee });
    }

    res.json({ exists: false, message: 'Failed. User not found.' });
  } catch (error) {
    console.error('Error get employee:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

//GET EMPLOYEE BY DEPARTMENT
router.get('/employee-by-dept', async (req, res) => {
  try {
    const { departmentId } = req.query;

    if (!departmentId) {
      return res.status(400).json({ success: false, message: 'Department ID is required.' });
    }

    const result = await Employee.findAll({
      where:
      {
        departmentId
      }
    });

    if (result.length > 0) {
      return res.json({ exists: true, message: 'Success', data: result });
    }

    res.json({ exists: false, message: 'Failed. User not found.' });
  } catch (error) {
    console.error('Error get employee:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
