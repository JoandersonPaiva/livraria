const Sequelize = require('sequelize')
const connection = require('../database/database')

const Categories = connection.define('categories',{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },slug:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

Categories.sync({force: false})

module.exports =  Categories