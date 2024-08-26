// Nathaniel Low P2323428 DIT/FT/1B/05

const express = require('express');
const router = express.Router();
const bossesController = require('../controllers/bossesController');

router.get('/', bossesController.getAllInfo);
router.get('/:boss_id', bossesController.getInfoById);
router.put('/:boss_id/user/:user_id/servant/:servant_id', 
bossesController.getBoss,
bossesController.getUserServant,
bossesController.checkIfStrongEnough,
bossesController.battleResult,
bossesController.bossDrop);

module.exports = router;