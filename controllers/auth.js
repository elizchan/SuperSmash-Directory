const express = require('express')
const router = express.Router()


router.get('/signup', (req, res)=>{
    res.render('auth/signup')
})

router.post('/signup', (req, res)=>{
    console.log('sign up form user data:', req.body)
    //redirect to login pg
    res.redirect('/auth/login')
})

router.get('/login', (req, res)=>{
    res.render('auth/login')
})

router.post('/login', (req, res)=>{
    console.log('posting to /auth/login')
    res.redirect('/')
})






module.exports = router