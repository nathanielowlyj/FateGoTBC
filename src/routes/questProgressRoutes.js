// Nathaniel Low P2323428 DIT/FT/1B/05

const express = require('express');
const router = express.Router();
const questProgressController = require('../controllers/questProgressController');

router.post('/', 
    questProgressController.checkIfQuestAlreadyExists,
    questProgressController.checkRequirements,
    questProgressController.markQuestComplete,
    questProgressController.rewards,
);
router.get('/:progress_id', questProgressController.getQuestProgressById);
router.get('/byUser/:user_id', questProgressController.getCompletedQuests);
router.put('/:progress_id', questProgressController.updateQuestRequirements);
router.delete('/:progress_id', questProgressController.deleteQuestProgressById);

module.exports = router;