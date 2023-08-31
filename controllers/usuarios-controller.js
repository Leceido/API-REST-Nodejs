const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const jwt = require('jsonwebtoken')

exports.cadastro = async (req, res, next) => {

    try {
        const usuario = await Usuario.findOne({user: req.body.user})

        if (usuario) {
            return res.status(409).send({error: "Este usuario ja tem uma conta"})
        } else {
            const novoUsuario = new Usuario({
                nome: req.body.nome,
                user: req.body.user,
                email: req.body.email,
                senha: req.body.senha
            })
        
            bcrypt.hash(novoUsuario.senha, 10, (errBcrypt, hash) => {
                if(errBcrypt){
                    return res.status(500).send({
                        error: errBcrypt
                    })
                }
        
                novoUsuario.senha = hash

                novoUsuario.save()

                res.status(201).send({
                    mensagem: "Usuario criado com sucesso!",
                    usuarioCriado: {
                        email: req.body.email,
                        user: req.body.user
                    }
                })
            })    
        }
    } catch (err) {
        res.status(500).send({error: "Ocorreu um erro ao tentar criar o usuario!"})
    }
}

exports.login = (req, res, next) => {
    Usuario.findOne({user: req.body.user}).then((usuario) => {
        if(!usuario) {
            return res.status(401).send({mensagem: "Falha na autenticacao, usuario não encontrado!!"})
        }
        bcrypt.compare(req.body.senha, usuario.senha, (err, result) => {
            if(result){
                try {
                    const token = jwt.sign({
                        id_usuario: usuario._id,
                        email: usuario.email
                    },
                    `${process.env.JWT_KEY}`,
                    {
                        expiresIn: "1h"
                    })
                    return res.status(200).send({
                        mensagem: "Usuario autenticado com sucesso!",
                        token: token
                    })
                } catch (err) {
                    res.status(500).send({error: "Ocorreu um erro ao criar a KEY JWT"})
                }
                
            } else {
                return res.status(401).send({mensagem: "Falha na autenticacao, usuario ou senha incorreto"})
            }
        })
    })
}