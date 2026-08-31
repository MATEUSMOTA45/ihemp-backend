const Loja = require("../models/Loja");
const Produto = require("../models/Produto");

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

// Exclui uma loja
const excluirLoja = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se a loja existe
    const loja = await Loja.findById(id);

    if (!loja) {
      return res.status(404).json({
        mensagem: "Loja não encontrada",
      });
    }

    // Verifica se existem produtos vinculados
    const produtoVinculado = await Produto.findOne({
      loja: id,
    });

    if (produtoVinculado) {
      return res.status(400).json({
        mensagem:
          "Não é possível excluir esta loja porque existem produtos vinculados a ela.",
      });
    }

    // Exclui a loja
    await Loja.findByIdAndDelete(id);

    return res.status(200).json({
      mensagem: "Loja excluída com sucesso!",
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: "Erro ao excluir loja",
      erro: erro.message,
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