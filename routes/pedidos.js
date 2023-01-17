const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Produto')
const Produto = mongoose.model('produtos')
require('../models/Pedido')
const Pedido = mongoose.model('pedidos')

router.get('/', (req, res, next) => {
    Pedido.find().populate('id_produto').then((result) => {
        const response = {
            quantidade: result.lenght,
            pedidos: result.map(pedido => {
                return {
                    pedido: pedido._id,
                    produto: {
                        id_produto: pedido.id_produto._id,
                        nome: pedido.id_produto.nome,
                        preco: pedido.id_produto.preco,
                        url_produto: `http://localhost:3000/produtos/${pedido.id_produto._id}`
                    },
                    quantidade: pedido.quantidade,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna um pedido especifico',
                        url: 'http://localhost:3000/pedidos/' + pedido._id
                    }
                }
            })
        }
        res.status(200).send({response})
    }).catch((err) => {
        res.status(500).send({
            error: err
        })
    })
})

router.post('/', (req, res, next) => {
    const novoPedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }

    new Pedido(novoPedido).save().then(() => {
        const response = {
            mensagem: "Pedido inserido",
            pedido: novoPedido,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todos os pedidos',
                url: 'http://localhost:3000/pedidos/'
            }
        }
        res.status(201).send({response})
    }).catch((err) => {
        res.status(500).send({
            error: err
        })
    })
})

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido
    Pedido.find({_id: id}).then((pedido) => {
        res.status(200).send({
            pedido: pedido,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todos os pedidos',
                url: 'http://localhost:3000/pedidos/'
            }
        })
    }).catch((err) => {
        res.status(500).send({
            error: 'Pedido nao econtrado'
        })
    })
})

router.delete('/', (req, res, next) => {
    Pedido.deleteOne({_id: req.body.id}).then(() => {
        res.status(201).send({
            mensagem: 'Pedido Excluido',
            request: {
                tipo: 'POST',
                descricao: 'Adicionar um pedido',
                url: 'http://localhost:3000/pedidos/',
                body: {
                    id_produto: "String",
                    quantidade: 0.0
                }
            }
        })
    }).catch((err) => {
        res.status(500).send({
            error: err
        })
    })
})

module.exports = router