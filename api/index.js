const express = require('express');
const { sequelize } = require('./models');

const app = express();
const port = 3000;

app.use(express.json());

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

initializeDatabase();

app.get('/', (req, res) => {
    res.send('Hello from Express API!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

