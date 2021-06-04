const Sequelize = require('sequelize')

const connection = new Sequelize('livraria','livraria','User1234',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection