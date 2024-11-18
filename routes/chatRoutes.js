const express = require('express')
const router = express.Router()
const checkAuthToken = require('../middleware/checkAuth')
const privateRoute = require('../controllers/privateController')

router.get('/chat', checkAuthToken, privateRoute)


module.exports = router