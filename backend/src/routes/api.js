const express = require('express');
const { login } = require('../controllers/authController');
const { userController } = require('../controllers/userController');

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

// User routes
router.post('/users', userController.create);
router.get('/users', userController.list);
router.get('/users/:id', userController.show);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

module.exports = router;
