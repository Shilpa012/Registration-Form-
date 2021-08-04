const { Console } = require("console");
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;

//EXPRES SPECIFIC STUFF
//for serving static file
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
//set templete engine for pug
app.set('view engine', 'pug');
//set the views directory using path module
app.set('views', path.join(__dirname, 'views'));

//Endpoints
app.get('/', (req, res) => {
  res.status(200).render('index.pug');
})


app.post('/', (req, res) => {
  name = req.body.name;
  age= req.body.age;
  gender=req.body.gender;
  address=req.body.address;
  console.log(req.body);
  let outputToWrite= `The name of the client is ${name} who is ${age} years old with ${gender} gender, residing in ${address}`
  fs.writeFileSync('output.txt',outputToWrite)
  const params = { 'message': 'Your Registration Form is submitted successfully' }
  res.status(200).render('index.pug', params);
})



app.listen(port, (req, res) => {
  console.log(`Listening to http://localhost:${port}`);
})