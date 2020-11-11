const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')


//get api info route
router.get('/', (req, res) => {
    const smashUrl = 'https://api.kuroganehammer.com/api/characters'
    //use request to get API
    axios.get(smashUrl).then((apiResponse)=>{
        const champion = apiResponse.data.results;
        res.render('index', {champion: champion})
    })
})

//GET /champions - return pg with favorited champions
router.get('/', (req, res) => {
    db.favorites.findAll()
    .then(favorites=>{
        res.render('favorites', {favorites: favorites})
    })
})

//SHOW route
router.get('/:id', (req, res)=>{
    const smashUrl = 'https://api.kuroganehammer.com/api/characters'
    axios.get(smashUrl)
    .then(response=>{
        res.render('show', {champion: response.data})
        console.log(response.data)
    })
    .catch(err=>{
        console.log(err)
    })
})
//DELETE favorites route
//router.delete()


module.exports = router