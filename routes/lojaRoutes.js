const express = require("express");

const {
    criarLoja,
    listarLojas,
    buscarLojaPorId,
    atualizarLoja,
    excluirLoja
} = require("../controllers/lojaController");

const autenticar = require("../middleware/authMiddleware");
const somenteAdmin = require("../middleware/adminMiddleware");
const validarObjectId = require("../middleware/validarObjectId");

const router = express.Router();

router.get("/", listarLojas);

router.get(
    "/:id",
    validarObjectId,
    buscarLojaPorId
);

router.post(
    "/",
    autenticar,
    somenteAdmin,
    criarLoja
);

router.put(
    "/:id",
    autenticar,
    somenteAdmin,
    validarObjectId,
    atualizarLoja
);

router.delete(
    "/:id",
    autenticar,
    somenteAdmin,
    validarObjectId,
    excluirLoja
);

module.exports = router;