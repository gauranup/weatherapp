const path = require("path");
const express = require("express");
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();
const publicDirectorypath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectorypath));

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
      title: 'About Me',
      name: 'Andrew Mead'
    })
})
app.get('/weather',(req,res) =>{
   if(!req.query.address)
   {
      return res.send({
        error: "Provide an address"
      })
      
   }
   const address = req.query.address
   geocode(address,(error,{latitude,longitude,location}={}) =>{
      if(error)
      {
        return res.send({
          error:error
        })
      }
      forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
          return res.send({
             error:error
          })
        }
        
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          })
        
      })
   })
  
})
app.get('/help',(req,res) =>{
    res.render('help',{
        helpText:' This is some helpful text',
        title:'help',
        name:'Anup'
    })
})
app.get('/help/*',(req,res)=>{
   res.render('404',{
     text:'Help article not found'
   })
})
app.get('*',(req,res) =>{
    res.render('404',{
      title:'404',
      text:'Page not found',
      errorMessage:'Page not found.',
      title:'Anup'
    })
})
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
