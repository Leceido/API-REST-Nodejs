const mongoose = require('mongoose')
require('../models/Produto')
const Produto = mongoose.model('produtos')

exports.getProdutos = async (req, res, next) => {
    try {
        const result = await Produto.find()
        const response = {
            quantidade: result.lenght,
            produtos: result.map(prod => {
                return {
                    id_produto: prod._id,
                    nome: prod.nome,
                    preco: prod.preco,
                    produto_imagem: prod.imagem_produto,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna um produto especifico',
                        url: 'http://localhost:3000/produtos/' + prod._id
                    }
                }
            })
        }
        res.status(200).send({response})
    } catch (err) {
        res.status(500).send({error: err})
    }
}

exports.postProdutos = (req, res, next) => {
    console.log(req.usuario);
    console.log(req.file);
    const novoProduto = {
        nome: req.body.nome,
        preco: req.body.preco,
        imagem_produto: `/uploads/${req.file.filename}`
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
}

exports.getProduto = async (req, res, next) => {
    const id = req.params.id_produto
    try {
        const produto = await Produto.find({_id: id})
        res.status(200).send({
            produto: produto,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todos os produtos',
                url: 'http://localhost:3000/produtos/'
            }
        })
    } catch (err) {
        res.status(500).send({error: 'Produto nao econtrado'})
    }
}

exports.patchProduto = async (req, res, next) => {
    try {
        const produto = await Produto.findOne({_id: req.body.id})

        produto.nome = req.body.nome
        produto.preco = req.body.preco

        await produto.save()

        res.status(201).send({
            mensagem: 'Produto Editado',
            produto: produto,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todos os produtos',
                url: 'http://localhost:3000/produtos/'
            }
        })
    } catch (err) {
        res.status(500).send({error: err})
    }
}

exports.deleteProduto = (req, res, next) => {
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
}