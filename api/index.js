require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', require('./routes/employeeRoutes'));

sequelize.authenticate()
    .then(() => console.log('✅ Database connected'))
    .catch(err => console.error('❌ Database connection failed:', err))

app.get('/', (req, res) => {
    res.send('Hello from Express API!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

