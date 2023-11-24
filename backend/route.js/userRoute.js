const express = require('express');
const router = express.Router()
const {createUser} = require('../controller/user')


router.post('/create-user', createUser)

module.exports = router;