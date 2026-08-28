const express = require("express");

const {
    criarPedido,
    listarPedidos,
    listarMeusPedidos,
    buscarPedidoPorId,
    atualizarStatusPedido,
    excluirPedido
} = require("../controllers/pedidoController");

const autenticar = require("../middleware/authMiddleware");
const somenteAdmin = require("../middleware/adminMiddleware");
const validarObjectId = require("../middleware/validarObjectId");

const router = express.Router();

router.post(
    "/",
    autenticar,
    criarPedido
);

router.get(
    "/",
    autenticar,
    somenteAdmin,
    listarPedidos
);

router.get(
    "/meus",
    autenticar,
    listarMeusPedidos
);

router.get(
    "/:id",
    autenticar,
    validarObjectId,
    buscarPedidoPorId
);

router.put(
    "/:id/status",
    autenticar,
    somenteAdmin,
    validarObjectId,
    atualizarStatusPedido
);

router.delete(
    "/:id",
    autenticar,
    somenteAdmin,
    validarObjectId,
    excluirPedido
);

module.exports = router;