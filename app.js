let request = require('request');



let apiKey = '4a48cc1e907db30402855363c6bd0486';

let city = 'portland';

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`



request(url, function (err, response, body) {

  if(err){

    console.log('error:', error);

  } else {

    console.log('body:', body);

  }

});