const Categoria = require('../models/Categorias');

// GET
// Obtiene todas las categorías
const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        return res.status(200).send({
            status: 'success',
            categorias: categorias
        });
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: 'No se pudieron obtener las categorías',
            error: error.message
        });
    }
};

module.exports = {
    getCategorias
}