const express = require('express');
const { login } = require('../controllers/authController');
const { userController } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    message: 'Backend funcionando! 🚀',
    team: 'To-Do App Team',
    status: 'OK'
  });
});

// Auth routes
router.post('/auth/login', authController.login);
router.get('/auth/me', autenticar, authController.me);
router.post('/auth/logout', autenticar, authController.logout);

// User routes
router.post('/users', userController.create);
router.get('/users', userController.list);
router.get('/users/:id', userController.show);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

module.exports = router;
