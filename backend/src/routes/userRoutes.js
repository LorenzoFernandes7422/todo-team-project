const express = require('express');
const { userController } = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.create);
router.get('/', userController.list);
router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;