const express = require("express");

const {
    cadastrarUsuario,
    listarUsuarios,
    buscarUsuarioPorId,
    loginUsuario ,
    promoverParaAdmin ,
    meuPerfil
} = require("../controllers/usuarioController");

const autenticar = require("../middleware/authMiddleware");
const somenteAdmin = require("../middleware/adminMiddleware");
const validarObjectId = require("../middleware/validarObjectId");


const router = express.Router();


router.post("/", cadastrarUsuario);

router.post("/login", loginUsuario);

router.get("/", autenticar, somenteAdmin , listarUsuarios);

router.get("/perfil/me", autenticar, meuPerfil);

router.put( "/:id/admin", autenticar , somenteAdmin , validarObjectId, promoverParaAdmin );

router.get("/:id", autenticar , validarObjectId, buscarUsuarioPorId);

module.exports = router;