const Sequelize = require('sequelize')

const connection = new Sequelize('livraria','root','Jpaiva94',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection