const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Produto')
const Produto = mongoose.model('produtos')
require('../models/Pedido')
const Pedido = mongoose.model('pedidos')

router.get('/', (req, res, next) => {
    Produto.find().then((produtos) => {
        res.status(200).send({
            produtos: produtos
        })
    }).catch((err) => {
        res.status(500).send({
            error: err
        })
    })
})

router.post('/', (req, res, next) => {
    const novoProduto = {
        nome: req.body.nome,
        preco: req.body.preco
    }

    new Produto(novoProduto).save().then(() => {
        res.status(201).send({
            mensagem: 'Produto criado',
            produto: novoProduto
        })
    }).catch((err) => {
        res.status(500).send({
            error: err
        })
    })
})

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto
    Produto.find({_id: id}).then((produto) => {
        res.status(200).send({
            produto: produto
        })
    }).catch((err) => {
        res.status(500).send({
            error: 'Produto nao econtrado'
        })
    })
})

router.patch('/', (req, res, next) => {
    Produto.findOne({_id: req.body.id}).then((produto) => {
        produto.nome = req.body.nome
        produto.preco = req.body.preco

        produto.save().then(() => {
            res.status(201).send({
                mensagem: 'Produto Editado',
                produto: produto
            })
        }).catch((err) => {
            res.status(500).send({
                error: err
            })
        })
    }).catch((err) => {
        res.status(500).send({
            error: err
        })
    })
})

router.delete('/', (req, res, next) => {
    Produto.deleteOne({_id: req.body.id}).then(() => {
        res.status(201).send({
            mensagem: 'Produto Excluido'
        })
    }).catch((err) => {
        res.status(500).send({
            error: err
        })
    })
})

module.exports = router