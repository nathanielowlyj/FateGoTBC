// Nathaniel Low P2323428 DIT/FT/1B/05

const express = require('express');
const router = express.Router();

const controller = require('../controllers/messageController');

router.get('/', controller.readAllMessage);
router.get('/byUser/:user_id', controller.readAllMessageFromUser);

router.post('/', controller.createMessage);
router.get('/:id', controller.readMessageById);
router.put('/:id', controller.updateMessageById);
router.delete('/:id', controller.deleteMessageById);

module.exports = router;