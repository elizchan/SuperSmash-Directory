const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')

//ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//body parser middleware to make req.body work
app.use(express.urlencoded({extended: false}))

//controller middleware
app.use('/auth', require('./controllers/auth.js'))

app.get('/', (req, res)=>{
    res.send('Express auth home route')
})

app.listen(8000, ()=>{
    console.log('listening to 8000')
})