const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend funcionando! 🚀',
    team: 'To-Do App Team',
    status: 'OK'
  });
});

app.get('/', (req, res) => {
  res.send('Backend do To-Do App');
});

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em: http://localhost:${PORT}`);
  console.log(`📡 Teste a rota: http://localhost:${PORT}/api/test`);
});