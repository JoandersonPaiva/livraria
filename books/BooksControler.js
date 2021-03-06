const express = require('express')
const router = express.Router()
const auth =  require('../middleware/auth')
const Categories = require('../categories/Categories')
const Books = require('./Books')
const slugify = require('slugify')


router.get('/admin/books', auth.admin,(req, res) => {
    Books.findAll({
        include:[{model:Categories}]
    }).then(books =>{
        res.render('admin/books/index', {user: req.session.user, books: books})

    })
})

router.get('/books', auth.users, (req, res) => {
    Books.findAll().then(books => {
        res.render('user/books/index', {user: req.session.user, books:books})
    })
})

router.get('/admin/books/new',auth.admin,(req, res) => {
    Categories.findAll().then(categories => {
        res.render('admin/books/new', {user: req.session.user, categories:categories})
    })
})

/*router.get('/admin/books-user',auth.admin,(req, res) => {
    Books.findAll().then(books => {
        res.render('admin/books/booksUser', {user: req.session.user, books:books})
    })
})*/

router.get('/admin/books/edit/:slug', auth.admin, (req, res) => {
    let slug = req.params.slug
    Books.findOne({
        where:{
            slug:slug

    }}).then(book => {
        Categories.findAll().then(categories => {
            res.render('admin/books/edit', {user: req.session.user, book:book, categories:categories}).catch(() => res.redirect('/admin/books'))
        })
    }).catch(() => res.redirect('/admin/books'))
})


router.post('/admin/books/create', auth.admin, (req, res) => {
    let name = req.body.name
    let description = req.body.description
    let quant = req.body.quant
    let cod= req.body.cod
    let categoryId = req.body.category
    let price = req.body.price
    let level =  req.body.level
    Books.findOne({
        where: {
            cod: cod
        }
    }).then(books => {
        if(books == undefined) {
            Books.create({
                name: name,
                slug: slugify(name),
                description: description,
                level: level,
                price:price,
                quant: quant,
                cod: cod,
                categoryId: categoryId
            }).then(() => res.redirect('/admin/books'))
                .catch(() => res.redirect('/admin/books/new'))
        }else{
            res.redirect('/admin/books')
        }
    })
})

router.post('/admin/books/save', auth.admin, (req, res) => {
    let id = req.body.id
    let name = req.body.name
    let description = req.body.description
    let quant = req.body.quant
    let cod= req.body.cod
    let categoryId = req.body.category
    let price = req.body.price
    let level =  req.body.level
    Books.update({
        name:name, 
        slug: slugify(name),
        description:description,
        level: level,
        price:price,
        quant:quant,
        cod:cod,
        categoryId:categoryId},{
            where: {
                id:id
            }
        }).then(() => res.redirect('/admin/books'))
            .catch(() => res.redirect('/admin/books'))
})

router.post('/admin/books/delete', auth.admin, (req, res) => {
    let id = req.body.id
    Books.destroy({
        where:{
            id:id
        }
    }).then(() => res.redirect('/admin/books'))
        .catch(() => res.redirect('/admin/books'))
})



module.exports = router