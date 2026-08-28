const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

const cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                mensagem: "Já existe um usuário com esse email"
            });
        }

        const usuario = await Usuario.create({
            nome,
            email,
            senha,
            tipo: "cliente"
        });

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário",
            erro: error.message
        });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select("-senha");

        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar usuários",
            erro: error.message
        });
    }
};

const buscarUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select("-senha");

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar usuário",
            erro: error.message
        });
    }
};

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    buscarUsuarioPorId
};
const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos"
            });
        }

        const senhaCorreta = await usuario.compararSenha(senha);

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos"
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                tipo: usuario.tipo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            token,
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao realizar login",
            erro: error.message
        });
    }
};



const promoverParaAdmin = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        usuario.tipo = "admin";

        await usuario.save();

        res.status(200).json({
            mensagem: "Usuário promovido para administrador com sucesso!",
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao promover usuário",
            erro: error.message
        });
    }
};

const meuPerfil = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select("-senha");

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar perfil",
            erro: error.message
        });
    }
};

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    buscarUsuarioPorId,
    loginUsuario,
    promoverParaAdmin ,
    meuPerfil
};