const express =  require('express')
const router = express.Router()
const Users =  require('./Users')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

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
                    level: user.level
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
            Users.create({
                name: name,
                gen: gen,
                email:email,
                password: hash,
                level: 1
            }).then(() =>{
                res.redirect('/login')
            })
        }
    }).catch(error => {
        res.redirect('/create')
    })
})

router.get('/home', auth.users ,(req, res) => {
    res.render('user/index', {user: req.session.user})
})

router.post('/logout', (req, res) => {
    req.session.user = undefined
    res.redirect('/login')
})
module.exports = router