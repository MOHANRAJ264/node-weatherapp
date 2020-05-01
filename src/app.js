//   for templating   npm i hbs

// instal git use git init in webserver folder


const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')
const app = express()

// define path for express
const publicdirectory = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath =path.join(__dirname,'../templates/partials')

//set handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

// setup static directory
app.use(express.static(publicdirectory))

app.get('',(req,  res)=>{
     res.render('index.hbs',{
         title: 'weather app',
         name: 'mohan'
     })
 })
 app.get('/about',(req,  res)=>{
    res.render('about.hbs',{
        title: 'about me',
        name: 'mohan'
    })
})
app.get('/help',(req,  res)=>{
    res.render('help.hbs',{
        title: 'help page',
        name: 'raj'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'you must provide an address '
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error)
        {
            return res.send({error})
        }
        
        forecast(data.latitude,data.longitude,(error,data2)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                location:data.location,
                temperature:data2.current,
                description:data2.description
            })
           
        })
        
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 error',
        name:'raj',
        errormsg: 'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 404,
        name:'mohan',
        errormsg: 'page nnot found'
    })
})
app.listen(3000,()=>{
    console.log('server started')
})




// app.get('/help',(req,res)=>{           /// instead of using app.get we used hrml files
//     res.send({
//         name :'mohan',
//         mail : 'tmr@gmail.com',
//         phone : 123456789

//     })
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>about page</h1>')
// })
