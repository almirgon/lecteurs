const express = require('express');
const router = express.Router();
const protectedRoute = require('../middleware/protectedRoute')
const userController = require('../controllers/userController')


router.post('/', userController.createUser)

router.get('/:id',protectedRoute, userController.getUser)

router.put('/:id', protectedRoute, userController.editUser)

router.delete('/:id', protectedRoute, userController.deleteUser)


module.exports = router