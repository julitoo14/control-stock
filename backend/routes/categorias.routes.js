const express = require('express');

//const check = require('../middlewares/auth');
const router = express.Router();
const categoriaController = require('../controllers/categorias.controller');

router.get('/', categoriaController.getCategorias);

module.exports = router;
