const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true
        },

        descricao: {
            type: String,
            trim: true
        },

        preco: {
            type: Number,
            required: true,
            min: 0
        },

        estoque: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

        categoria: {
            type: String,
            trim: true
        },

        loja: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Loja",
            required: true
        },

        ativo: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Produto", produtoSchema);