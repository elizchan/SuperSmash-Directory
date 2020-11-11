require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')

//ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//body parser middleware to make req.body work
app.use(express.urlencoded({extended: false}))

//middleware for session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//middleware for passport
app.use(passport.initialize())
app.use(passport.session())

//flash middleware
app.use(flash())

//CUSTOM middleware
app.use((req, res, next)=>{
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() //move on to the next piece of middleware
})
//controller middleware
app.use('/auth', require('./controllers/auth.js'))
app.use('/smash', require('./controllers/smash.js'))

//get api info route
app.get('/', (req, res)=>{
    const smashUrl = 'https://api.kuroganehammer.com/api/characters'
    //use request to get API
    axios.get(smashUrl).then(function(apiResponse) { 
        console.log('hi..........................')
        console.log(apiResponse.data)
        const champions = apiResponse.data
        res.render('index', {champions: champions})
    })
})

app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

app.listen(process.env.PORT, ()=>{
    console.log('listening to 8000')
})