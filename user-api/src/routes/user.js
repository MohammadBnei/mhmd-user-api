var express = require('express')
const {
    register: registerController,
    login: loginController,
    find: findController
} = require('../controller')
var router = express.Router()

router.get('/', findController.findAll)
router.post('/register', registerController)
router.post('/login', loginController)

module.exports = router

