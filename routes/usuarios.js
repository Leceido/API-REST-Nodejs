const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const jwt = require('jsonwebtoken')

const UsuariosController = require('../controllers/usuarios-controller')


router.post('/cadastro', UsuariosController.cadastro)

router.post('/login', UsuariosController.login)

module.exports = router