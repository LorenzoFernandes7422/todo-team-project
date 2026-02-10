const express = require('express');
const { authController } = require('../controllers/authController');
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
router.get('/auth/me', auth, authController.me);
router.post('/auth/logout', auth, authController.logout);

// User routes
router.post('/users', userController.create);
router.get('/users', auth, userController.list);
router.get('/users/:id', auth, userController.show);
router.put('/users/:id', auth, userController.update);
router.delete('/users/:id', auth, userController.delete);

module.exports = router;
