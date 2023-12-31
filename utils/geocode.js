
const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXNoaXNodWszOCIsImEiOiJjbDEzOXRpdXQwMTYxM2tveDljbmgwczh4In0.2LzS7X9cAzIWfRdf6llyrQ'
    request({url, json :true}, (error, response)=>{
        if(error){
            callback('Thres is an error', undefined)
        }else if(response.body.features.length === 0){
            callback('Place not found, change query', undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: address
            })
        }
    } )
}

module.exports = geocode