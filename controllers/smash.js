const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')

//POST - receive name of champion and add it to database
router.post('/', (req, res)=>{
    db.champion.create({name: req.body.Name, image: req.body.MainImageUrl})
    .then(createdFave=>{
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
        console.log(createdFave)
        res.redirect('/smash')
        console.log(createdFave)
    })
    .catch(err=>{
        console.log('there is an error', err)
    })
})
//GET /champions - return pg with favorited champions
router.get('/', (req, res) => {
    db.champion.findAll()
    .then(favorites=>{
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        console.log(favorites)
        res.render('favorites', {favorites: favorites})
    })
})

//SHOW route
router.get('/:id', (req, res)=>{
    const smashUrl = 'https://api.kuroganehammer.com/api/characters'
    axios.get(smashUrl)
    .then(response=>{
        res.render('show', {champions: response.data})
        console.log(response.data)
    })
    .catch(err=>{
        console.log(err)
    })
})
//DELETE favorites route
//router.delete()


module.exports = router