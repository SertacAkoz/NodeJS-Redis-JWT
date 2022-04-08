const { ExampleModel } = require('../Models/ExampleModel')
const { RedisToken } = require('../Models/RedisToken')
const jwt = require('jsonwebtoken')
const httpStatus = require('http-status');
const redisClient = require('../connections/redis')



const getToken = (req, res) => {

  try {
    const { email, password } = req.body;
    const expTime = 600;

    const spritedString = String(email).split('@')


    if (spritedString[1] == "company.com") {
      if (email == "sertac@company.com" && password == "123") {
        // algorithm: 'RS256'
        const jwtOptions = {
          expiresIn: expTime
        }

        const token = jwt.sign({
          email: email,
          password: password,
          ad: 'bName',
          issuer: 'BCODE'
        }, 'secretKey', jwtOptions)

        const sendingJson = {
          token: token,
          expires_in: expTime
        }
        res.send(sendingJson)
      } else {
        res.status(httpStatus.BAD_REQUEST).send("Kullanıcı Bulunamadı!!!")
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).send("Company Kullanıcısı Değilsiniz!!!")
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}

const decodeToken = (req, res) => {
  try {
    const token = req.params.token

    const decodedToken = jwt.verify(token, 'secretKey')

    const formatedToken = {
      email: decodedToken.email,
      password: decodedToken.password,
      name: decodedToken.ad,
      issuer: decodedToken.issuer,
      iat: new Date(decodedToken.iat * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      exp: new Date(decodedToken.exp * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }

    res.send(formatedToken)
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }

}

const getJson = (req, res) => {

  try {
    const exampleData = new ExampleModel(req.body)

    res.send(exampleData)
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }


}

const getList = (req, res) => {
  try {
    const sendingJson = [
      { name: "sertac", surname: "akoz" },
      { name: "fatih", surname: "solmaz" }
    ]

    res.send(sendingJson)
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }

}

const update = (req, res) => {
  try {
    res.send("UPDATE")
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }

}

const getRedisData = (req, res) => {

  try {
    redisClient.get('name', (error, message) => {

      if (error) {
        res.send(error)
      }

      const object = {
        name: message
      }

      res.send(object)

    })
  } catch (error) {
    res.send(error)
  }

}

const setRedisData = (req, res) => {
  var redisToken = new RedisToken(req.body)

  redisClient.set(redisToken.key,redisToken.value,'EX', 3000,(error, message) => {
    if(error){
      res.send(error)
    }else{
      res.send(message)
    }
    
  })

}

const tokenExists = (req, res) => {

  const tokenKey = req.params.tokenKey

  redisClient.exists(tokenKey,(error, message) => {
    if(error){
      res.send(error)
    }else{

      const jsonObject = {
        status:message
      }

      res.send(jsonObject)
    }
  })
}

module.exports = {
  getToken,
  getJson,
  getList,
  update,
  decodeToken,
  getRedisData,
  setRedisData,
  tokenExists
}
