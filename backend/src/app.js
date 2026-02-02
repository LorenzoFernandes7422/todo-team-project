const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend do To-Do App');
});

app.use('/api', apiRoutes);

module.exports = app;
