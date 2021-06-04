const Sequelize = require('sequelize')

const connection = new Sequelize('livraria','superuser','VGvelBuwzvNtjOYk',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection