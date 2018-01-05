var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var request = require('request');

const apiKey = '****your-key***';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/',function(req,res,next){
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

request(url,function(err,response,body){
	console.log(body);
	if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
	}
})

});

module.exports = router;
