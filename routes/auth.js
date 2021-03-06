const express = require('express')
const router = express.Router()
const { signup } = require('../controllers/auth')

//Validators
const { runValidation } = require('../validators')
const { userSignupValidator } = require('../validators/auth')

router.post('/signup', runValidation, userSignupValidator, signup);

module.exports = router;