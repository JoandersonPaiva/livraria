const express = require('express')
const router = express.Router()
const auth =  require('../middleware/auth')
const Categories = require('../categories/Categories')
const Books = require('./Books')

router.get('/admin/books', auth.admin,(req, res) => {
    res.send('admin aceito')
})




module.exports = router