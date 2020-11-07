const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/ppConfig.js')

router.get('/signup', (req, res)=>{
    res.render('auth/signup')
})

router.post('/signup', (req, res)=>{
    console.log('sign up form user data:', req.body)
    //check if user already exists, if it does throw an error message or create new user to store in db
    db.user.findOrCreate({
        where: {email: req.body.email},
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    })
    .then(([createdUser, wasCreated])=>{
        if(wasCreated){
            console.log('just created the following user', createdUser)
            //log new user in
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Account created and logged in!'
            })(req, res) //IIFE = immediately invoked function
        } else {
            req.flash('error', 'email already exists, try logging in')
            res.redirect('/auth/login') //redirect to login pg
            // console.log('an account associated with email already exists! try logging in ')
        }
         //redirect to login pg
        //res.redirect('/auth/login')
    })
    .catch(err=>{
        req.flash('error', err.message)
        res.redirect('/auth/signup')
    })
})

router.get('/login', (req, res)=>{
    res.render('auth/login')
})

//login with passport setup
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/',
    failureFlash: 'Invalid email or password',
    successFlash: "you are now logged in!"
}))

router.get('/logout', (req, res)=>{
    req.logout()
    req.flash('successfully logged out!')
    res.redirect('/')
})




module.exports = router