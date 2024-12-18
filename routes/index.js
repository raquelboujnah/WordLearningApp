const express = require('express')
const userController = require('../controllers/user')
const cookieParser = require('cookie-parser');

const router = express.Router()

router.use(express.json())
router.use(cookieParser())

router.route('/registration')
    // .get(userController.getRegistrationPage)
    .post(userController.handleRegistration)

router.route('/login')
    // .get(userController.getLoginPage)
    .post(userController.handleLogin)

router.route('/')
    .get(userController.getPage)

router.route('/style.css')
    .get(userController.sendStartStyle)

router.route('/script.js')
    .get(userController.sendStartScript)


module.exports = router;