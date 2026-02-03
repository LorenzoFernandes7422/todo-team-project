const express = require('express');
const { login } = require('../controllers/authController');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    message: 'Backend funcionando! 🚀',
    team: 'To-Do App Team',
    status: 'OK'
  });
});

// Auth routes
router.post('/auth/login', login);

router.use('/users', userRoutes);

module.exports = router;
