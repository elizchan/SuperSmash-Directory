const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const methodOverride = require('method-override')
const isLoggedIn = require('../middleware/isLoggedIn')

//method override middleware
router.use(methodOverride('_method'))

//POST new messages in /comments
router.post('/', (req, res)=>{
    console.log('@@@@@@@@@@@@@@@',req)
    db.comment.create({
        content: req.body.commentContent,
        userId: req.user.id
    })
    .then(comment => {
        res.redirect('/comments')
    })
    .catch(err=>{
        console.log(err)
    })
})

//GET all messages in /comments
router.get('/', (req, res)=>{
    console.log('@@@@@@@@@@@@@@@',req)
    db.comment.findAll({
        include: [db.user]
    })
    .then(comments => {
        comments.forEach(comment=>{
            console.log(comment.user.name)
        })
        res.render('comments', {comments: comments})
    })
})

//DELETE comment route
router.delete('/:idx', (req, res) => {
    db.comment.findOne({
        where: {
            id: req.params.idx
        }
    })
    .then(foundComment=>{
        console.log(foundComment)
        if(req.user.id === foundComment.userId){
            db.comment.destroy({
                where: {id: foundComment.id}
            })
            .then(deleted =>{
                res.redirect('/comments')
            })
        } else {
            req.flash('error', "you are not the correct user! please delete your own!")
            res.redirect('/comments')
        }
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router