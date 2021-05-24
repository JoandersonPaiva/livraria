//requisições
const express = require('express')
const app = express()


//Importar rotas



// Models



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

app.listen(8080, () => {
    console.log('Rodando')
})