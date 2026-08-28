const mongoose = require("mongoose");

const lojaSchema = new mongoose.Schema(
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

        endereco: {
            type: String,
            required: true,
            trim: true
        },

        telefone: {
            type: String,
            trim: true
        },

        ativa: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Loja", lojaSchema);