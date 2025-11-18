const express = require('express');

const app = express();
const http = require ('http');
const port = 3000;
const hostname = '127.0.0.1';

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Express API!');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://localhost:${port}`);
});
