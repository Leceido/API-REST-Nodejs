const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()

const rotaProdutos = require('./routes/produtos')
const rotaPedidos = require('./routes/pedidos')
const rotaUsuarios = require('./routes/usuarios')

const mongoose = require('mongoose')
require('./models/Produto')
const Produto = mongoose.model('produtos')
require('./models/Pedido')
const Pedido = mongoose.model('pedidos')


app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.set('strictQuery', false)
mongoose.Promise = global.Promise
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.tx76yln.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("Conectado ao mongoDB");
}).catch((err) => {
    console.log("Erro ao tentar se conectar com o mongoDB" + err);
})

app.use('/usuarios', rotaUsuarios)
app.use('/produtos', rotaProdutos)
app.use('/pedidos', rotaPedidos)

app.use((req, res, next) => {
    const erro = new Error('404 ERROR - Nao encontrado')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app