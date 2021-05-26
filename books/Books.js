const Sequelize = require('sequelize')
const connection = require('../database/database')
const Categories = require('../categories/Categories')

const Books = connection.define('books',{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },description:{
        type:Sequelize.TEXT,
        allowNull:false
    },quant:{
        type:Sequelize.INTEGER,
        allowNull:false
    },cod:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

//Relacionamentos
Categories.hasMany(Books)
Books.belongsTo(Categories)

//Books.sync({force: false})

module.exports =  Books