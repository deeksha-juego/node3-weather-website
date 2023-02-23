const path=require('path')//core node modules buit in(no need to install)
const { response } = require('express')
const express=require('express')
const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

const app=express()//to generate the application
const port=process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath)) //way to customise server

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'Deeksha Shetty'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Deeksha Shetty'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful Text',
        title:'Help',
        name:'Deeksha Shetty'
    })
})
//app.com
app.get('',(req,res)=>{
    res.send('<h1>Weather</h1>')
})

// //app.com/help
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Deeksha',
//         age:27
//     },{name:'sarah'}])
// })




// //app.com/about
// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>')
// })

//app.com/weather
app.get('/weather',(req,res)=>{
    if (!req.query.address) {
       return res.send({
           error:'You must provide a search term'
       })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
         if(error)
         {
             return res.send(
                {
                    error  })
         }
         forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address

            })
         })

    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return  res.send({
            error:'You must provide a search term'
        })
    }


   


    console.log(req.query.search);
    res.send({
       products:[]

    })
})





app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Deeksha Shetty',
        error:'Help article not found'
    })
})

app.get('*',(req,res)=>{
      res.render('404',{
        title:404,
        name:'Deeksha Shetty',
        error:'Page not found'
      })
})


app.listen(port,()=>{
    console.log('Server is up on port',port);
}) //for starting up the server