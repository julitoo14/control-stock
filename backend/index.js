require('dotenv').config();
const connection = require('./config/database'); // Importa la función de conexión a la BD
connection();
//dependencias
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/categorias', require('./routes/categorias.routes'));



app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Stock app listening on port ${port}!`));