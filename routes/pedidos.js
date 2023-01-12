const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Exibe os pedidos'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Cria um pedido'
    })
})

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido

    res.status(200).send({
        mensagem: 'Exibe informacoes de um pedido'
    })
})

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Edita um pedido'
    })
})

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Exclui um pedido'
    })
})

module.exports = router