var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var router = require('./routes/router')
const port = 3000;


app.use(bodyParser.json())
app.use("/",router);


// Listen to this Port
app.listen(port,function(){
  console.log("Live at Port 3000");
});