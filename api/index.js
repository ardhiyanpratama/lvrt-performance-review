require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { initDatabase } = require('./scripts/dbSyncAndSeed');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', require('./routes/employeeRoutes'));
app.use('/api', require('./routes/departementRoutes'));
app.use('/api', require('./routes/hardcompetenciesRoutes'));
app.use('/api', require('./routes/softcompetenciesRoutes'));


(async () => {
    try {
        await initDatabase();

        app.get('/', (req, res) => {
            res.send('Hello from Express API!');
        });

        app.listen(port, host, () => {
            console.log(`Server running at http://${host}:${port}`);
        });
    } catch (err) {
        console.error('❌ Failed to initialize database:', err);
        process.exit(1);
    }
})();



