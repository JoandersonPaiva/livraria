const Sequelize = require('sequelize')
const connection = require('../database/database')
const Users = require('../user/Users')

const Transactions = connection.define('transactions',{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    }
})


Users.hasMany(Transactions)
Transactions.belongsTo(Users)

Transactions.sync({force: false})

module.exports =  Transactions