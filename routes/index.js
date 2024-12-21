const express = require('express')
const userController = require('../controllers/user')
const cardController = require('../controllers/cards')
const cookieParser = require('cookie-parser');

const router = express.Router()

router.use(express.json())
router.use(cookieParser())

router.route('/registration')
    .post(userController.handleRegistration)

router.route('/login')
    .post(userController.handleLogin)

router.route('/cards')
    .get(cardController.getCards)
    .post(cardController.create)
    .put(cardController.update)

router.route('/')
    .get(userController.getPage)

router.route('/session')
    .get(cardController.getSessionPage)
    .post(cardController.startSession)
    

module.exports = router;