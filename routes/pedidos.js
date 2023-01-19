const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Produto')
const Produto = mongoose.model('produtos')
require('../models/Pedido')
const Pedido = mongoose.model('pedidos')

const PedidosController = require('../controllers/pedidos-controller')

router.get('/', PedidosController.getPedidos)

router.post('/', PedidosController.postPedidos)

router.get('/:id_pedido', PedidosController.getPedido)

router.delete('/', PedidosController.deletePedido)

module.exports = router