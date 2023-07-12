const request = require('request')

const forecast = (location, callback)=>{
    const url =  'http://api.weatherstack.com/current?access_key=f924d852f258c70a035bad7c38a95dcb&query='+encodeURIComponent(location)

    request({url, json:true}, (error, response)=>{
        if(error){
            callback('Some error happened', undefined)
        }else{
          callback(undefined, 'Current temperature for ' + location + ' is '+ response.body.current['temperature'])
        }
    })
}

module.exports = forecast

// request({url: url, json: true}, (error, response) => {
//     // if we use json : true in request, we won't need to parse the response as it was done in below code
//    // const data =JSON.parse(response.body)
//    const data = response.body
//     console.log('Current temperature in New Delhi is ' + data.current['temperature'])
// })