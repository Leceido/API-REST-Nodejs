const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Pedido = new Schema({
    id_produto: {
        type: Schema.Types.ObjectId,
        ref: 'produtos',
    },
    quantidade: {
        type: Number,
        required: true,
    }
})

mongoose.model('pedidos', Pedido)