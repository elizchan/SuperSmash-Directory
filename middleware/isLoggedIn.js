module.exports = (req, res, next) => {
    if(!req.user){ //if no one is logged in
        req.flash('error', 'you must be logged in to access that page.')
        res.redirect('/auth/login')
    } else {
        next()
    }
}