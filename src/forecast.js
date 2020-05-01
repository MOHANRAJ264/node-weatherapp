const request = require('request');

const forecast = (latitude,longitude,callback)=>{
    const url1 = 'http://api.weatherstack.com/current?access_key=6bdebeaa6754ccc0011bc934a45a29f7&query='+ latitude +','+ longitude
    request({url:url1,json:true},(error,response) =>{
        if(error){
            callback('unable to connect',undefined)
        }else if(response.body.error){
            callback('coordinates not find',undefined)
        }else{
            callback(undefined,{
                current :response.body.current.temperature,
                description :response.body.current.weather_descriptions[0],
                //location : response.body.location.name
            })
        }
    })
    }


module.exports =forecast