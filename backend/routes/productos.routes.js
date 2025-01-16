import express from 'express';
import { query } from 'express-validator';
import handleValidationErrors from '../middlewares/validationMiddleware.js';
import { validateSaveProduct, validateUpdateProduct } from '../validations/productsValidation.js';

//const check = require('../middlewares/auth');
import {
    saveProduct,
    getAllOrFilteredProducts,
    updateProduct,
    deleteProduct,
    getProductById
    }
    from '../controllers/productos.controller.js';
const router = express.Router();
    
router.get('/', [
    query('precioMin').optional().isNumeric().withMessage('El precio mínimo debe ser un número'),
    query('precioMax').optional().isNumeric().withMessage('El precio máximo debe ser un número'),
    query('search').optional().isString().withMessage('El término de búsqueda debe ser un texto'),
    query('limit').optional().isInt().withMessage('El límite debe ser un número entero'),
    query('page').optional().isInt().withMessage('La página debe ser un número entero'),
], getAllOrFilteredProducts);
router.get('/:id', getProductById);
router.post('/', validateSaveProduct, handleValidationErrors, saveProduct);
router.put('/:id',validateUpdateProduct, handleValidationErrors, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
