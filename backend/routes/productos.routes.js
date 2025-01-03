const express = require('express');

//const check = require('../middlewares/auth');
const router = express.Router();
const productoController = require('../controllers/productos.controller');

router.get('/', productoController.getFilteredProducts);
router.get('/:id', productoController.getProductById);
router.get('/categoria/:category', productoController.getProductsByCategory);
router.post('/', productoController.createProduct);
router.put('/:id', productoController.updateProduct);
router.delete('/:id', productoController.deleteProduct);

module.exports = router;
