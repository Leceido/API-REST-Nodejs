const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Produto')
const Produto = mongoose.model('produtos')
require('../models/Pedido')
const Pedido = mongoose.model('pedidos')

router.get('/', (req, res, next) => {
    Produto.find().then((result) => {
        const response = {
            quantidade: result.lenght,
            produtos: result.map(prod => {
                return {
                    id_produto: prod._id,
                    nome: prod.nome,
                    preco: prod.preco,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna um produto especifico',
                        url: 'http://localhost:3000/produtos/' + prod._id
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
    const novoProduto = {
        nome: req.body.nome,
        preco: req.body.preco
    }

    new Produto(novoProduto).save().then(() => {
        const response = {
            mensagem: "Produto inserido",
            produto: novoProduto,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todos os produtos',
                url: 'http://localhost:3000/produtos/'
            }
        }
        res.status(201).send({response})
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
            produto: produto,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todos os produtos',
                url: 'http://localhost:3000/produtos/'
            }
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
                produto: produto,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todos os produtos',
                    url: 'http://localhost:3000/produtos/'
                }
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
            mensagem: 'Produto Excluido',
            request: {
                tipo: 'POST',
                descricao: 'Adicionar um produto',
                url: 'http://localhost:3000/produtos/',
                body: {
                    nome: "String",
                    preco: 0.0
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