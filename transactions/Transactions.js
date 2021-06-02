const Sequelize = require('sequelize')
const connection = require('../database/database')
const Users = require('../user/Users')

const Transactions = connection.define('transactions',{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },slug:{
        type: Sequelize.STRING,
        allowNull:false
    },description:{
        type:Sequelize.TEXT,
        allowNull:false
    },price:{
        type:Sequelize.FLOAT,
        allowNull:false
    },quant:{
        type:Sequelize.INTEGER,
        allowNull:false
    },cod:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})


Users.hasMany(Transactions)
Transactions.belongsTo(Users)

//Transactions.sync({force: false})

module.exports =  Transactions