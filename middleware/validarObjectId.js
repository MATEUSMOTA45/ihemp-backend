const mongoose = require("mongoose");

const validarObjectId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    next();
};

module.exports = validarObjectId;