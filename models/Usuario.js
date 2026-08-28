const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        senha: {
            type: String,
            required: true,
            minlength: 6
        },

        tipo: {
            type: String,
            enum: ["cliente", "admin"],
            default: "cliente"
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

usuarioSchema.pre("save", async function () {
    if (!this.isModified("senha")) {
        return;
    }

    this.senha = await bcrypt.hash(this.senha, 10);
});

usuarioSchema.methods.compararSenha = async function (senhaInformada) {
    return bcrypt.compare(senhaInformada, this.senha);
};

module.exports = mongoose.model("Usuario", usuarioSchema);