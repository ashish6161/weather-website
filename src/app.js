const path = require('path')
const forecast = require('../utils/forecast')
const express = require('express')
const hbs = require('hbs')


const app = express()



// path.join to to create path of public directory
const publicDirectoryPath = path.join(__dirname, '../public')

//set path for partials (header footer)
const partialPath = path.join(__dirname, '../templates/partials')

// Set dynamic path for template (hbs) files instead of default root path views folder
const viewsPath = path.join(__dirname, '../templates/views')

//Set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// app.use() is used to customize server whereas express.static() used to tell express to serve the folder content
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    // index must match with hbs file
    res.render('index', {
        title : 'Home Page',
        author: 'Ashish'
    })
})


app.get('/help', (req, res)=>{
    res.render('help', {
        title: "Help",
        author: "Ashish"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Please provide an address in search!'
        })
    }
    const data = forecast(req.query.search, (error, data)=>{
        if(error){
            res.render('error', {
                error,
                title: 'Error Found',
                author: "Ashish"
            })
        } else {
            res.send( {
                title : 'Weather Update',
                data,
                author:"Ashish"
            })
        }
    })
        
})

// for page specific 404 pages
app.get('/help/*', (req, res) =>{
    res.render('404', {
        author:"Ashish",
        message: "Article not found!"
    })
})


// for 404 pages
app.get('*', (req, res) =>{
    res.render('404', {
        author :"Ashish",
        message: "Please change URL"
    })
})

//start the server
//listen() is used only once, and is to access port for that server
app.listen(3000, ()=>{
    console.log('Server is up and running on port 3000')
})

// run command node src/app.js to start the server since we are using port 3000 we can visit the url localhost:3000 to access this request

//Every change in the file would need server to be restarted, in order to avoid this we can use nodemon which will refresh the server every time file is saved

