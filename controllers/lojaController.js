const Loja = require("../models/Loja");

const criarLoja = async (req, res) => {
    try {
        const loja = await Loja.create(req.body);

        res.status(201).json({
            mensagem: "Loja criada com sucesso!",
            loja
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar loja",
            erro: error.message
        });
    }
};

const listarLojas = async (req, res) => {
    try {
        const lojas = await Loja.find();

        res.status(200).json(lojas);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar lojas",
            erro: error.message
        });
    }
};

const buscarLojaPorId = async (req, res) => {
    try {
        const loja = await Loja.findById(req.params.id);

        if (!loja) {
            return res.status(404).json({
                mensagem: "Loja não encontrada"
            });
        }

        res.status(200).json(loja);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar loja",
            erro: error.message
        });
    }
};

const atualizarLoja = async (req, res) => {
    try {
        const loja = await Loja.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!loja) {
            return res.status(404).json({
                mensagem: "Loja não encontrada"
            });
        }

        res.status(200).json({
            mensagem: "Loja atualizada com sucesso!",
            loja
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar loja",
            erro: error.message
        });
    }
};

const excluirLoja = async (req, res) => {
    try {
        const loja = await Loja.findByIdAndDelete(req.params.id);

        if (!loja) {
            return res.status(404).json({
                mensagem: "Loja não encontrada"
            });
        }

        res.status(200).json({
            mensagem: "Loja excluída com sucesso!"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir loja",
            erro: error.message
        });
    }
};

module.exports = {
    criarLoja,
    listarLojas,
    buscarLojaPorId,
    atualizarLoja,
    excluirLoja
};