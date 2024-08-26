// Nathaniel Low P2323428 DIT/FT/1B/05

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware.js');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware.js') 

const messageRoutes = require('./messageRoutes');
router.use("/message", messageRoutes);

const userRoutes = require('./userRoutes.js');
router.use("/users", userRoutes);

const servantsRoutes = require('./servantsRoutes.js');
router.use("/servants", servantsRoutes);

const summoningRoutes = require('./summoningRoutes.js');
router.use("/summoning", summoningRoutes);

const bossesRoutes = require('./bossesRoutes.js');
router.use("/bosses", bossesRoutes);

const questRoutes = require('./questRoutes.js');
router.use("/quest", questRoutes);

const questProgressRoutes = require('./questProgressRoutes.js');
router.use("/questProgress", questProgressRoutes);

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", 
    userController.checkUsernameOrEmailExist, 
    bcryptMiddleware.hashPassword, 
    userController.register, 
    userController.createNewUserServants, 
    userController.createNewUserInventory,
    jwtMiddleware.generateToken, 
    jwtMiddleware.sendToken
);

module.exports = router;