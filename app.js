//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));//compulsory while using bodyparser

app.get("/", function(req, res){
  res.sendFile(_dirname + "/index.html");
});

app.post("/", function(req, res){ //catch the data typed as input
console.log(req.body.cityName);
res.sendFile("Post request received. ");
const query  = req.body.cityName;
const apiKey = "4cb0ac76e8ba4edf4a938427ce764918";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units ;

https.get(url, function(response){ //HTTP get request to get api data
console.log(response.statusCode);  //it is seen in server 

response.on("data", function(data){
const weatherData = JSON.parse(data); //CONVERT DATA INTO JSON FORMAT
const temp = weatherData.main.temp;
const weatherDescription = weatherData.weather[0].description;
const icon = weatherData.weather[0].icon;
const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
res.write("<p>The weather is currently " + weatherDescription + "<p>");
res.write("<h1>The temperature in london is " + temp + "degree Celcius.</h1>");
res.write("<img src ="+ imageURL + ">"); //sending response from server to browser
});
});
});


app.listen(process.env.PORT,function() {
  console.log("Server is running on port 3000. ");
});
