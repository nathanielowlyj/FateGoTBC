// Nathaniel Low P2323428 DIT/FT/1B/05

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.checkIfEmailExist, userController.createNewUser,userController.getUserId,userController.createNewUserServants, userController.createNewUserInventory);

router.get('/', userController.readAllUsers);
router.get('/:user_id', userController.getUserById);
router.get('/userServants/:user_id', userController.getByUserId);
router.get('/completedQuests/:user_id', userController.getCompletedQuestsByUserId);

router.put('/:user_id', userController.checkIfEmailOrUsernameExists, userController.updateUserById);

router.delete('/:user_id', userController.deleteByUserId);

module.exports = router;