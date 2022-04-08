const router = require('express').Router()
const firstController = require('../controllers/first-controller')

router.get('/',firstController.myFunction)

router.post('/', firstController.postFunction)

router.get('/get-data', firstController.getDataFunction)

module.exports = router
