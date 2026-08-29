const express = require("express");
const cors = require("cors");

const lojaRoutes = require("./routes/lojaRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "API IHEMP está no ar via Docker 🚀"
    });
});

app.use("/api/lojas", lojaRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use((req, res) => {
    res.status(404).json({
        mensagem: "Rota não encontrada"
    });
});

module.exports = app;
