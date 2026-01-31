const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();
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

// Rotas adimin:
// ------------------------Criar admin-----------------------
app.post('/admin', async (req, res) => {
  try {
    const admin = await prisma.admin.create({
      data: req.body
    });
    res.json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ---------------------Listar admin----------------------
app.get('/admin', async (req, res) => {
  try {
    const admins = await prisma.admin.findMany();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -----------------------Buscar admin--------------------
app.get('/admin/:id', async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }
    
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(` Backend rodando em: http://localhost:${PORT}`);
  console.log(` Teste a rota: http://localhost:${PORT}/api/test`);
  console.log(` Rota Admin: POST/GET http://localhost:${PORT}/admin`);
});