const Pedido = require("../models/Pedido");
const Produto = require("../models/Produto");

const criarPedido = async (req, res) => {
    try {
        const { loja, itens, observacao } = req.body;

        if (!itens || itens.length === 0) {
            return res.status(400).json({
                mensagem: "O pedido precisa ter pelo menos um produto"
            });
        }

        const itensCalculados = [];
        let valorTotal = 0;

        for (const item of itens) {
            const produto = await Produto.findById(item.produto);

            if (!produto) {
                return res.status(404).json({
                    mensagem: `Produto não encontrado: ${item.produto}`
                });
            }

            if (produto.loja.toString() !== loja) {
                return res.status(400).json({
                    mensagem: `O produto ${produto.nome} não pertence à loja informada`
                });
            }

            if (produto.estoque < item.quantidade) {
                return res.status(400).json({
                    mensagem: `Estoque insuficiente para o produto ${produto.nome}`
                });
            }

            const subtotal = produto.preco * item.quantidade;

            valorTotal += subtotal;

            itensCalculados.push({
                produto: produto._id,
                quantidade: item.quantidade,
                precoUnitario: produto.preco
            });
        }

        const pedido = await Pedido.create({
            usuario: req.usuario.id,
            loja,
            itens: itensCalculados,
            valorTotal,
            observacao
        });

        for (const item of itens) {
            await Produto.findByIdAndUpdate(
                item.produto,
                {
                    $inc: {
                        estoque: -item.quantidade
                    }
                }
            );
        }

        res.status(201).json({
            mensagem: "Pedido criado com sucesso!",
            pedido
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar pedido",
            erro: error.message
        });
    }
};

const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate("usuario", "-senha")
            .populate("loja")
            .populate("itens.produto")
            .sort({ createdAt: -1 });

        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar pedidos",
            erro: error.message
        });
    }
};

const listarMeusPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find({
            usuario: req.usuario.id
        })
            .populate("loja")
            .populate("itens.produto")
            .sort({ createdAt: -1 });

        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar seus pedidos",
            erro: error.message
        });
    }
};

const buscarPedidoPorId = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id)
            .populate("usuario", "-senha")
            .populate("loja")
            .populate("itens.produto");

        if (!pedido) {
            return res.status(404).json({
                mensagem: "Pedido não encontrado"
            });
        }

        if (
            req.usuario.tipo !== "admin" &&
            pedido.usuario._id.toString() !== req.usuario.id
        ) {
            return res.status(403).json({
                mensagem: "Você não tem permissão para acessar este pedido"
            });
        }

        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar pedido",
            erro: error.message
        });
    }
};

const atualizarStatusPedido = async (req, res) => {
    try {
        const { status } = req.body;

        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!pedido) {
            return res.status(404).json({
                mensagem: "Pedido não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Status do pedido atualizado com sucesso!",
            pedido
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar pedido",
            erro: error.message
        });
    }
};

const excluirPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndDelete(req.params.id);

        if (!pedido) {
            return res.status(404).json({
                mensagem: "Pedido não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Pedido excluído com sucesso!"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir pedido",
            erro: error.message
        });
    }
};

module.exports = {
    criarPedido,
    listarPedidos,
    listarMeusPedidos,
    buscarPedidoPorId,
    atualizarStatusPedido,
    excluirPedido
};