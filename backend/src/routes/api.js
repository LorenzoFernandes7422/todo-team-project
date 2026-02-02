const express = require('express');
const { login } = require('../controllers/authController');

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

module.exports = router;
