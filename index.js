require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
const methodOverride = require('method-override')
const db = require('./models/index.js')

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

//method override middleware
app.use(methodOverride('_method'))

//controller middleware
app.use('/auth', require('./controllers/auth.js'))
app.use('/smash', require('./controllers/smash.js'))
app.use('/comments', require('./controllers/comments.js'))

//bootstrap middleware
app.use(express.static(__dirname + '/public'))

//get api info route
app.get('/', (req, res)=>{
    const smashUrl = 'https://api.kuroganehammer.com/api/characters/'
    //use request to get API
    axios.get(smashUrl).then(function(apiResponse) { 
        console.log(apiResponse.data)
        const champions = apiResponse.data
        res.render('index', {champions: champions})
    })
})

//SHOW ROUTE
app.get('/details/:ownerid', (req, res)=>{
    const smashUrl = `https://api.kuroganehammer.com/api/characters/${req.params.ownerid}/movements`
    axios.get(smashUrl)
    .then(response=>{
        console.log(response)
        console.log('@@@@@@@@@@@@@@@@@@', response.data)
        res.render('show', {movements: response.data})
    })
    .catch(err=>{
        console.log(err)
    })
})

//PUT route for user profile pg
app.put('/profile', (req, res) => {
    db.user.update({
        name: req.body.newName
    },
    {
        where: {
            id: req.body.userId
        }
    })
    .then(updatedUser => {
        console.log("new user: ",updatedUser)
        res.redirect('/profile')
    })
    .catch(err=>{
        console.log(err)
    })
})

app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

app.listen(process.env.PORT, ()=>{
    console.log('listening to 8000')
})