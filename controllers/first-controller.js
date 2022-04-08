const axios = require('axios')
const { ExampleModel } = require('../Models/ExampleModel')

const myFunction = (req, res) => {

  const object = {
    msg:"message..."
  }
  
  res.send(object)
}

const postFunction = (req, res) => {
  
  var comingData = new ExampleModel(req.body)
  
  res.send(comingData.name)
}

const getDataFunction = (req, res) => {

  var data;

  axios.get('https://reqres.in/api/users', {
    params: {
      page:2
    }
  })
  .then(function(response){
    data = response.data.data;
  })
  .catch(function(err){
    res.send(err)
  })
  .then(function(){
    // Always Executed
    res.send(data);
  })

}

module.exports = {
  myFunction,
  postFunction,
  getDataFunction
}
