const request = require('request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2VtYWwiLCJhIjoiY2tjNWw1YXo3MGl4YTJ2bG11bHY3Z2M1NCJ9.gHok_gaMK5HccxWNvwHZDw&limit=1';

    request({url, json:true}, (error, {body})=>{
            if (error) {
                    callback('internet is slow or disconnected', undefined);
            }else if (body.features.length ===0) {
                    callback('location not found', undefined);
            }else {
                    callback(undefined, {latitude:body.features[0].center[1],
                        longitude:body.features[0].center[0], 
                        location:body.features[0].place_name});
            }
    });


}



module.exports = geocode;

