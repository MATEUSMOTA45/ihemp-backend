const express = require("express");

const {
    criarProduto,
    listarProdutos,
    buscarProdutoPorId,
    atualizarProduto,
    excluirProduto
} = require("../controllers/produtoController");

const autenticar = require("../middleware/authMiddleware");
const somenteAdmin = require("../middleware/adminMiddleware");
const validarObjectId = require("../middleware/validarObjectId");

const router = express.Router();

router.get("/", listarProdutos);

router.get("/:id", validarObjectId , buscarProdutoPorId);

router.post(
    "/",
    autenticar,
    somenteAdmin,
    criarProduto
);

router.put(
    "/:id",
    autenticar,
    somenteAdmin,
    validarObjectId,
    atualizarProduto
);

router.delete(
    "/:id",
    autenticar,
    somenteAdmin,
    validarObjectId,
    excluirProduto
);

module.exports = router;