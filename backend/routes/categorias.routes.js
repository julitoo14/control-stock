import express from 'express';

//const check = require('../middlewares/auth');
const router = express.Router();
import { getCategorias } from '../controllers/categorias.controller.js';

router.get('/', getCategorias);

export default router;
