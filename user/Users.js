const Sequelize = require('sequelize')
const connection =  require('../database/database')

const Users = connection.define('users', {
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },gen:{
        type:Sequelize.STRING,
        allowNull: false
    },email: {
        type: Sequelize.STRING,
        allowNull:false
    }, password: {
        type:Sequelize.STRING,
        allowNull:false
    },level:{
        type:Sequelize.INTEGER,
        allowNull:false
    },balance: {
        type:Sequelize.FLOAT,
        allowNull: false
    }
})

Users.sync({force: false})

module.exports = Users