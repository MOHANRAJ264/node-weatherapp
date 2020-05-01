const request = require('request');


const geocode = (address,callback)=>{
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidG1vaGFucmFqMjY0IiwiYSI6ImNrOWk2dXp4NTAwbXEzbXA1bWc3bjkwZjgifQ.yRaHw6EXftKmm_aTEnYatA&limit=1'
    request({url:url2,json:true},(error,response) =>{
        if (error) {
            callback('unable to connect',undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find location',undefined)
        } else {
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports =geocode