const Produto = require("../models/Produto");

const criarProduto = async (req, res) => {
    try {
        const produto = await Produto.create(req.body);

        res.status(201).json({
            mensagem: "Produto criado com sucesso!",
            produto
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar produto",
            erro: error.message
        });
    }
};

const listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find().populate("loja");

        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar produtos",
            erro: error.message
        });
    }
};

const buscarProdutoPorId = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id).populate("loja");

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar produto",
            erro: error.message
        });
    }
};

const atualizarProduto = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Produto atualizado com sucesso!",
            produto
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar produto",
            erro: error.message
        });
    }
};

const excluirProduto = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Produto excluído com sucesso!"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir produto",
            erro: error.message
        });
    }
};

module.exports = {
    criarProduto,
    listarProdutos,
    buscarProdutoPorId,
    atualizarProduto,
    excluirProduto
};