const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Exibe os produtos'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Cria um produto'
    })
})

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    res.status(200).send({
        mensagem: 'Exibe informacoes de um produto'
    })
})

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Edita um produto'
    })
})

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Exclui um produto'
    })
})

module.exports = router