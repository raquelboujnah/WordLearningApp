const express = require('express')

const router = express.Router()
router.use(express.json())

router.router('/registration');

router.router('/login');

router.router('/');


module.exports = router;