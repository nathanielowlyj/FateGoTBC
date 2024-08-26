const express = require('express');
const router = express.Router();
const questController = require('../controllers/questController');

router.post('/', questController.createNewQuest);
router.get('/', questController.getQuests);
router.get('/:quest_id', questController.getQuestById);
router.put('/:quest_id', questController.updateQuestById);
router.delete('/:quest_id', questController.deleteQuest);

module.exports = router;