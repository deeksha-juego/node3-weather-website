const request=require('request')
const geocode=(address,callback)=>{
    // const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2hldHR5ZGVla3NoYSIsImEiOiJjbGVjaDN5YzQxaXd0M25wNmJ2MGEyY28xIn0.AvXBbpaTo_iLmbQIWYO-3w&limit=1'
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hldHR5ZGVla3NoYSIsImEiOiJjbGVjaDN5YzQxaXd0M25wNmJ2MGEyY28xIn0.AvXBbpaTo_iLmbQIWYO-3w&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
           callback('Unable to connect to location services',undefined)
        }
         else if(body.features.length===0)
        {
           callback('unable to find location.Try another search',undefined)
        }
        else
        {
            callback(undefined,{
               latitude:body.features[0].center[1],
               longitude:body.features[0].center[0],
               location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode