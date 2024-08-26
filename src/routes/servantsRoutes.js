const express = require('express');
const router = express.Router();
const servantsController = require('../controllers/servantsController');

router.get('/', servantsController.getAllInfo);
router.get('/:servant_id', servantsController.getInfoById);

module.exports = router;