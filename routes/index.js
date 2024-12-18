const express = require('express')
const userController = require('../controllers/user')

const router = express.Router()
router.use(express.json())

router.route('/registration')
    .get(userController.getRegistrationPage)
    .post(userController.handleRegistration)

router.route('/login')
    .get(userController.getLoginPage)
    .post(userController.handleLogin)

router.route('/')
    .get(userController.getMain)


module.exports = router;