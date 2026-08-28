const mongoose = require("mongoose");

const itemPedidoSchema = new mongoose.Schema(
    {
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Produto",
            required: true
        },

        quantidade: {
            type: Number,
            required: true,
            min: 1
        },

        precoUnitario: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        _id: false
    }
);

const pedidoSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },

        loja: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Loja",
            required: true
        },

        itens: {
            type: [itemPedidoSchema],
            required: true,
            validate: {
                validator: function (itens) {
                    return itens.length > 0;
                },
                message: "O pedido deve possuir pelo menos um item"
            }
        },

        valorTotal: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "pendente",
                "confirmado",
                "preparando",
                "enviado",
                "entregue",
                "cancelado"
            ],
            default: "pendente"
        },

        observacao: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Pedido", pedidoSchema);