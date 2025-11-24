require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { initDatabase } = require('./scripts/dbSyncAndSeed');

const db = require('../models');
const Employee = db.Employee;

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


(async () => {
    try {
        await initDatabase();

        // app.use('/api', require('./routes/employeeRoutes'));
        // app.use('/api', require('./routes/departementRoutes'));
        // app.use('/api', require('./routes/hardcompetenciesRoutes'));
        // app.use('/api', require('./routes/softcompetenciesRoutes'));

        app.get('/', (req, res) => {
            res.send('Hello from Express API!');
        });

        app.post('/login', async (req, res) => {
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

        app.listen(port, host, () => {
            console.log(`Server running at http://${host}:${port}`);
        });
    } catch (err) {
        console.error('❌ Failed to initialize database:', err);
        process.exit(1);
    }
})();



