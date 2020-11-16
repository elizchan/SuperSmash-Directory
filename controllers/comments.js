const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const methodOverride = require('method-override')

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
    db.comment.destroy({
        where: {
            id: req.params.idx
        }
    })
    .then(deleted => {
        res.redirect('/comments')
    })
    .catch(err => {
        console.log(err)
    })
})
module.exports = router