const express = require('express')
const router = express.Router()
const auth =  require('../middleware/auth')
const Categories = require('./Categories')

router.get('/admin/categories', auth.admin, (req, res) => {
    res.send('admin categories')
})


module.exports = router