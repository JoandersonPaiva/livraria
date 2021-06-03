const express = require('express')
const router = express.Router()
const auth =  require('../middleware/auth')
const Categories = require('./Categories')
const Books = require('../books/Books')
const slugify = require('slugify')

router.get('/admin/categories', auth.admin, (req, res) => {
    Categories.findAll().then(categories => {
        res.render('admin/categories/index', {categories:categories, user:req.session.user})
    })

})

router.get('/categories', auth.users, (req, res) => {
    Categories.findAll().then(categories => {
        res.render('user/categories/index', {user:req.session.user, categories:categories})
    })
})

router.get('/admin/categories-user', auth.admin, (req, res) => {
    Categories.findAll().then(categories => {
        res.render('admin/categories/categoriesUser', {user:req.session.user, categories:categories})
    })
})

router.get('/admin/categories/new',(req, res) => {
    res.render('admin/categories/new', {user:req.session.user})
})

router.get('/admin/categories/edit/:slug',(req, res) => {
    let slug = req.params.slug
    Categories.findOne({
        where:{
            slug:slug
        }
    }).then(category => {
            res.render('admin/categories/edit', {user:req.session.user, category:category}) 
    }).catch(() => res.redirect('/admin/categories'))
})

router.post('/admin/categories/create', auth.admin , (req, res) => {
    let name =  req.body.name
    if(name !== undefined) {
        Categories.findOne({
            where:{
                name:name
            }
        }).then(category => {
            if(category == undefined){
                Categories.create({
                    name:name,
                    slug: slugify(name)
                }).then(() => {
                    res.redirect('/admin/categories')
                }).catch(() => {
                    res.redirect('/admin/categories/new')

                })
            }else{
                res.redirect('/admin/categories')
            }
        }).catch(() => res.redirect('/admin/categories/new'))
    }else{
        res.redirect('/admin/categories')
    }
    
})

router.post('/admin/categories/save', auth.admin , (req, res) => {
    let id = req.body.id
    let name =  req.body.name
    if(name != undefined){
        Categories.update({name:name, slug:slugify(name)}, {
            where:{
                id:id
            }
        }).then(() => {
            res.redirect('/admin/categories')
        }).catch(() => res.redirect('/admin/categories'))
    }else{
        res.redirect('/admin/categories/edit')
    }
})


router.post('/admin/categories/delete', auth.admin, (req, res) => {
    let id =  req.body.id
    Categories.destroy({
        where: {
            id:id
        }
    }).then(() => res.redirect('/admin/categories'))
        .catch(() => res.redirect('/admin/categories'))
})

router.post('/admin/categories-user/:name', auth.admin, (req, res) => {
    let name =  req.body.name
    res.json(name)
})

router.post('/categories/:name', auth.users, (req, res) => {
    let name = req.body.name
    res.json(name)
})

module.exports = router