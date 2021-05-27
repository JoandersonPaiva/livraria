const Sequelize = require('sequelize')

const connection = new Sequelize('livraria','root','User@123',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection