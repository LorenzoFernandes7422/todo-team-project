const express = require('express');
const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();
const router = express.Router();

// Rota de teste
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Backend funcionando! 🚀',
    team: 'To-Do App Team',
    status: 'OK'
  });
});

// ------------------------Criar admin-----------------------
router.post('/admin', async (req, res) => {
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
router.get('/admin', async (req, res) => {
  try {
    const admins = await prisma.admin.findMany();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -----------------------Buscar admin--------------------
router.get('/admin/:id', async (req, res) => {
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

module.exports = router;