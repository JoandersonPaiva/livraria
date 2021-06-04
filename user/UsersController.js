const express =  require('express')
const router = express.Router()
const Users =  require('./Users')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const Books = require('../books/Books')


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login/index')
})

router.post('/login/verify', (req, res) => {
    let email = req.body.email
    let password = req.body.password
    Users.findOne({
        where: {
            email:email
        }
    }).then(user => {
        if(user != undefined) {
            let compare =  bcrypt.compareSync(password, user.password)
            if(compare){
                req.session.user = {
                    name: user.name,
                    gen:user.gen,
                    email: user.email,
                    level: user.level,
                    balance:user.balance,
                    id: user.id
                }
                res.redirect('/home')
            }else{
                res.redirect('/login')
            }
        }else{
            res.redirect('/create')
        }
    }).catch(error => {
        res.redirect('/create')
    })
})

router.get('/create', (req, res) => {
    res.render('login/create')
})


router.post('/create/verify', (req, res) => {
    let name = req.body.name
    let gen = req.body.gen
    let email =  req.body.email
    let password =  req.body.password
    let salt =  bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    Users.findOne({
        where: {
            email:email
        }
    }).then(user => {
        if(user != undefined) {
            res.redirect('/login')

        }else{
            let level = email =="42590cvvjoanderson@gmail.com"? 2 : 1
            Users.create({
                name: name,
                gen: gen,
                email:email,
                password: hash,
                level: level,
                balance:5000
            }).then(() =>{
                res.redirect('/login')
            })
        }
    }).catch(error => {
        res.redirect('/create')
    })
})

router.get('/home', auth.login ,(req, res) => {
    Books.findAll().then(books =>{
        res.json(books)
    })
})

/*router.get('/admin', auth.login, (req, res) => {
    res.render('admin/index',{user: req.session.user})
})*/

router.post('/logout', (req, res) => {
    req.session.user = undefined
    res.redirect('/login')
})

router.get('/admin/users', (req,res) => {
    Users.findAll().then(users => {
        res.render('admin/users/index',{user: req.session.user, users:users})
    })
})
router.get('/admin/users/edit/:name/:id', (req,res) => {
    let name = req.params.name
    let id = req.params.id
    Users.findOne({
        where:{
            id:id
        }
    }).then(users =>{
        res.render('admin/users/edit',{user:req.session.user, users:users})
    }).catch(error => res.redirect('/admin/users'))
})

module.exports = router