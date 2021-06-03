const router =  require('express').Router()
const auth =  require('../middleware/auth')
const Transactions = require('../transactions/Transactions')
const Users = require('../user/Users')
const Books = require('../books/Books')

router.get('/admin/books-user/buy/:slug', (req, res) => {
    let slug = req.params.slug
    Books.findOne({
        where:{
            slug:slug
        }
    }).then(book =>{
        res.render('user/buy/index', {user:req.session.user, book:book})

    }).catch(() => res.redirect('/admin/books-user'))
})

router.get('/books/buy/:slug', (req, res) =>{
    let slug = req.params.slug
    Books.findOne({
        where:{
            slug:slug
        }
    }).then(book => {
        res.render('user/buy/index', {user:req.session.user, book:book})
    }).catch(() => res.redirect('/books'))
})

module.exports = router