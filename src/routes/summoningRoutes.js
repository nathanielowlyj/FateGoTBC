// Nathaniel Low P2323428 DIT/FT/1B/05

const express = require('express');
const router = express.Router();
const summoningController = require('../controllers/summoningController');

router.get('/', summoningController.getAllServantsInfo);
router.get('/:servant_id', summoningController.getServantsInfoById);
router.put('/:user_id', 
summoningController.checkIfEnoughSaintQuartz, 
summoningController.updatingUserInventory,
summoningController.summon, 
summoningController.checkIfServantIsOwned, 
summoningController.checkForRefund, 
summoningController.refund,
summoningController.deleteDuplicate);

module.exports = router;