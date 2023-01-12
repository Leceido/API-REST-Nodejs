const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Produto')
const Produto = mongoose.model('produtos')
require('../models/Pedido')
const Pedido = mongoose.model('pedidos')

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Exibe os pedidos'
    })
})

router.post('/', (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mensagem: 'Cria um pedido',
        pedido: pedido
    })
})

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido

    res.status(200).send({
        mensagem: 'Exibe informacoes de um pedido'
    })
})

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Exclui um pedido'
    })
})

module.exports = router