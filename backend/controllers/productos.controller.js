const Producto = require('../models/Productos');
const Categoria = require('../models/Categorias');

// GET
// Obtiene todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Producto.find().populate('categoria');
        return res.status(200).send({
            status: 'success',
            products: products
        });
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: 'No se pudieron obtener los productos',
            error: error.message
        });
    }
};

// Obtiene producto por ID
const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Producto.findById(id).populate('categoria');
        if (!product) {
            return res.status(404).send({
                status: 'error',
                message: 'Producto inexistente'
            });
        }

        return res.status(200).send({
            status: 'success',
            product: product
        });
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: 'No se pudo obtener el producto',
            error: error.message
        });
    }
};

// Obtiene todos los productos de una categoría
const getProductsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const products = await Producto.find({ categoria: category }).populate('categoria');
        if (products.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay productos en esta categoría'
            });
        }
        return res.status(200).send({
            status: 'success',
            products: products
        });
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: 'No se pudieron obtener los productos',
            error: error.message
        });
    }
};

// POST
// Crea un nuevo producto
const createProduct = async (req, res) => {
    const product = new Producto(req.body);
    if(!product){
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos'
        });
    }
    try {
        await product.save();
        return res.status(201).send({
            status: 'success',
            message: 'Producto creado con éxito',
            product: product
        });
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: 'No se pudo crear el producto',
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const product = await Producto.findByIdAndUpdate(id, data, { new: true });
        if (!product) {
            return res.status(404).send({
                status: 'error',
                message: 'Producto inexistente'
            });
        }
        return res.status(200).send({
            status: 'success',
            message: 'Producto actualizado con éxito',
            product: product
        });
    }catch(error){
        return res.status(400).send({
            status: 'error',
            message: 'No se pudo actualizar el producto',
            error: error.message
        });
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try{
        const product = await Producto.findOneAndDelete({ _id: id });
        
        if (!product) {
            return res.status(404).send({
                status: 'error',
                message: 'Producto inexistente'
            });
        }

        return res.status(200).send({
            status: 'success',
            message: 'Producto eliminado con éxito',
            product: product
        });

    } catch(error){
        return res.status(400).send({
            status: 'error',
            message: 'No se pudo eliminar el producto',
            error: error.message
        });
    }
}

module.exports = {
    getProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
};
