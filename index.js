const express = require('express');
//const https = require('https');
const https = require('http');
const fs = require('fs');
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser')
const rawEncoder = bodyParser.json()

const firstRoute = require('./routes/first-route')
const tokenRoute = require('./routes/token-route')
/*
var key = fs.readFileSync('/usr/local/psa/var/modules/letsencrypt/etc/archive/napi.estetikcep.com/privkey1.pem');
var cert = fs.readFileSync('/usr/local/psa/var/modules/letsencrypt/etc/archive/napi.estetikcep.com/cert1.pem');
var options = {
  key: key,
  cert: cert
};
*/

app = express()

app.use(rawEncoder)

app.use('/first', firstRoute)
app.use('/token', tokenRoute)

app.get('/', (req, res) => {

  const sendingObject = {
    server:"napi.estetikcep.com --> working... :)"
  }
  res.send(sendingObject)
});

app.post('/deneme', function (req, res) {
  res.send(req.body)
})


app.get('/deneme', function (req, res) {

  const object = {
    message: "Deneme"
  }

  res.send(object)
})

var server = https.createServer(app);

server.listen(port, () => {
  console.log("server starting on port : " + port)
});
