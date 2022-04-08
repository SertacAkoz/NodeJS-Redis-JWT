const router = require('express').Router()
const tokenController = require('../controllers/token-controller')
const tokenValidator = require('../validators/token-validator')
const tokenHelper = require('../helpers/check-token')
const res = require('express/lib/response')


router.get('/',(req, res) => {
    res.send("Token Route...")
})

router.post('/get-token', tokenValidator.loginValidation,tokenController.getToken)

router.post('/getJson',tokenController.getJson)

router.get('/get-list', tokenHelper.checkToken, tokenController.getList)

router.post('/update', tokenHelper.checkToken, tokenValidator.loginValidation,tokenController.update)

router.get('/decode-token/:token', tokenHelper.checkToken, tokenController.decodeToken)

router.get('/redis-data',tokenController.getRedisData)

router.post('/set-redis',tokenValidator.setRedisToken,tokenController.setRedisData)

router.get('/redis-exists/:tokenKey',tokenController.tokenExists)

module.exports = router
