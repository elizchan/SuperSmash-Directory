const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const isLoggedIn = require('../middleware/isLoggedIn')

//POST - receive name of champion and add it to database
router.post('/', (req, res)=>{
    db.champion.create({name: req.body.Name, image: req.body.MainImageUrl})
    .then(createdFave=>{
        req.user.addChampion(createdFave)
        .then((newAssocation)=>{
            console.log(createdFave)
            res.redirect('/smash')
        })
    })
    .catch(err=>{
        console.log('there is an error', err)
    })
})

//GET /smash - return pg with favorited champions
router.get('/', (req, res) => {
    db.user.findOne({
        where: {id: req.user.id},
        include: [db.champion]
    })
    .then(foundUser=>{
        console.log(foundUser.champions)
        res.render('favorites', {favorites: foundUser.champions})
    })
})

//DELETE favorites route
router.delete('/:idx', (req, res) => {
    db.champion.destroy({
        where: {
            name: req.body.name
        }
    })
    .then(deleted => {
        res.redirect('/smash')
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router