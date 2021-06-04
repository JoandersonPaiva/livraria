const router =  require('express').Router()
const auth =  require('../middleware/auth')
const Transactions = require('../transactions/Transactions')
const Users = require('../user/Users')
const Books = require('../books/Books')

/*router.get('/admin/books-user/buy/:slug', (req, res) => {
    let slug = req.params.slug
    Books.findOne({
        where:{
            slug:slug
        }
    }).then(book =>{
        res.render('user/buy/index', {user:req.session.user, book:book})

    }).catch(() => res.redirect('/admin/books-user'))
})*/

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

router.post('/books/buy', (req,res) => {
    let name = req.body.name
    let quant =  req.body.quant
    let userId = req.session.user.id
    Books.findOne({where:{
        name:name
    }}).then(book => {
        let quantBook = book.quant - quant
        let totPrice = book.price * quant
        Users.findOne({where:{
            id:userId
        }}).then(user => {
            let totBalance = user.balance - totPrice
            Books.update({quant:quantBook},{
                where:{ name:name}
            }).then(()=>{ 
                Users.update({balance:totBalance},
                    {where:{
                        id:userId
                    }},
                     req.session.user =  {
                        name: user.name,
                        gen:user.gen,
                        email: user.email,
                        level: user.level,
                        balance:totBalance,
                        id: user.id
                    }).then(() => {
                        Transactions.create({
                           name:name,
                           slug: book.slug,
                           description: book.description,
                           price: book.price,
                           quant: quant,
                           cod: book.cod,
                           userId: userId 
                        })
                    }).then(() =>{                      
                        res.redirect('/books')
                    }).catch(() => res.redirect('/'))
            }).catch(() => res.redirect('/'))
        }).catch(() => res.redirect('/'))
    }).catch(() => res.redirect('/'))
})

router.get('/my-books', (req, res) => {
    let userId = req.session.user.id
    Transactions.findAll({where:{
        userId:userId
    }}).then(books => {
        res.render('user/books/myBooks', {user:req.session.user, books:books})
    }).catch(() => res.redirect('/home'))
})

router.get('/my-books/:book', (req, res) => {
    let slug = req.params.book
    let userId = req.session.user.id
    Transactions.findOne({where:{
        slug:slug,
        userId:userId
    }}).then(book => {
        res.render('user/books/myBooksDescription',{user:req.session.user, book:book})
    })
})

module.exports = router