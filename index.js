//requisições
const express = require('express')
const app = express()
const connection =  require('./database/database')
const session = require('express-session')


//Importar rotas
const usersController =  require('./user/UsersController')


// Models
const Users =  require('./user/Users')

//Session
app.use(session({
    secret: 'bookszondutable',
    cookie: {maxAge: 300000}
}))

//View engine
app.set('view engine', 'ejs')

//Paginas estáticas
app.use(express.static('public'))

//bodyparser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Rotas

app.get('/', (req, res) => {
    res.render('index')
})


connection
.authenticate()
.then(() => {
    console.log('Conexão com banco de dados bem sucedida')
}).catch((error) => {
    console.log(error)
})

app.use('/', usersController)


app.listen(8080, () => {
    console.log('Rodando')
})