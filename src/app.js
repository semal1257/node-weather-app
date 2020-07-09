const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
// Define paths for express configuration
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')
const publicDirectoryPath = path.join(__dirname,'../public')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
// Setup static directory to serve
 app.use(express.static(publicDirectoryPath))
// Agents
app.get('', (req, res) => {
    res.render('index', {
        title:'Home',
        heading:'Weather',
        name:'Semal'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        heading:'Help',
        name:'S Das'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Semal Das',
        heading:'About ',
        title:'about page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'Please provide address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })


    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'Please provide search item...'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        heading:'Error code: 404',
        name:'Semal Das',
        titile:'404 help',
        errorMessage:'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        heading:'Error code:404',
        title:'404 ',
        name:'Semal',
        errorMessage:'page not found'
    })
})
app.listen(3000, () =>{
    console.log('Server is up at port:3000.....')
})
