const request = require('request');

const forecast = (latitude, longitude, callback) => {
    
    const url ='http://api.weatherstack.com/current?access_key=04f2d872d6a51d555da20b3f55f7146e&query='+latitude+','+longitude+'&units=m';
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Weather service is not accessible.!!', undefined)
        } else if (body.error) {
            callback('Please provide correct location coordinates.!!', undefined)
        }else {
            callback(undefined,`The weather will be "${body.current.weather_descriptions[0]}". Current temperature is : ${body.current.temperature} degree Centrigrade and humidity is ${body.current.humidity} %. `);
          
        }
    })   

}


module.exports = forecast;