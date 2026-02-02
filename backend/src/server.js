const express = require('express');
const cors = require('cors');
const apiRoutes = require('../routes/api.js');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend do To-Do App');
});


app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(` Backend rodando em: http://localhost:${PORT}`);
  console.log(` Teste a rota: http://localhost:${PORT}/api/test`);
  console.log(` Rota Admin:  http://localhost:${PORT}/api/admin`);
});