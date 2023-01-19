const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Produto')
const Produto = mongoose.model('produtos')
require('../models/Pedido')
const Pedido = mongoose.model('pedidos')
const multer = require('multer')
const path = require('path')
const login = require('../helpers/login')

const ProdutosController = require('../controllers/produtos-controller')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname );
    }
})
const upload = multer({storage})

router.get('/', ProdutosController.getProdutos)

router.post('/', login, upload.single('produto_imagem'), ProdutosController.postProdutos)

router.get('/:id_produto', ProdutosController.getProduto)

router.patch('/', login, ProdutosController.patchProduto)

router.delete('/', login, ProdutosController.deleteProduto)

module.exports = router