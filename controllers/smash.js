const express = require('express')
const router = express.Router()
const db = require('../models')

//
//get api info route
app.get('/', (req, res) => {
    const smashUrl = 'https://api.kuroganehammer.com/api/characters'
    //use request to get API
    axios.get(smashUrl).then(function(apiResponse) {
        const character = apiResponse.data.results
        res.render('index', {character: character})
    })
})


module.exports = router