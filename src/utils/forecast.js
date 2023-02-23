const request=require('request')
const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=12edc0fae646d659a68aad007d9e37fa&query='+latitude+','+longitude+'&units=f';

request({url,json:true},(error,{body})=>{
   if(error)
   {
        callback('unable to connect to services',undefined)
   }
   else if(body.error)
   {
        callback('unable to find location.Try another  helloooo search',undefined)
        
   }
   else
   {
       callback(undefined,
          body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out.It feels like "+body.current.feelslike+" degrees out"
    )

   }

})
}
module.exports=forecast

