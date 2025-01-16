import Categoria from '../models/Categorias.js';

const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export { getCategorias };